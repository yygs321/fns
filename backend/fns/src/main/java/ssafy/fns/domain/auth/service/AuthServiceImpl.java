package ssafy.fns.domain.auth.service;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.regex.Pattern;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.auth.controller.dto.CheckEmailRequestDto;
import ssafy.fns.domain.auth.controller.dto.EmailRequestDto;
import ssafy.fns.domain.auth.controller.dto.RefreshAccessTokenRequestDto;
import ssafy.fns.domain.auth.controller.dto.SignInRequestDto;
import ssafy.fns.domain.auth.entity.MailHistory;
import ssafy.fns.domain.auth.entity.RefreshToken;
import ssafy.fns.domain.auth.repository.MailHistoryRepository;
import ssafy.fns.domain.auth.repository.RefreshTokenRepository;
import ssafy.fns.domain.auth.service.dto.AuthResponseDto;
import ssafy.fns.domain.auth.service.dto.TokenResponseDto;
import ssafy.fns.domain.auth.vo.Token;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.entity.Provider;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.global.exception.GlobalRuntimeException;
import ssafy.fns.global.security.JwtTokenProvider;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MailHistoryRepository mailHistoryRepository;
    private final EmailSender emailSender;

    @Override
    @Transactional
    public void sendEmail(EmailRequestDto requestDto) {
        emailDupicationCheck(requestDto.getEmail());

        String email = requestDto.getEmail();
        String code = generateAuthCode();

        MailHistory history = MailHistory.builder()
                .email(email)
                .code(code)
                .build();

        mailHistoryRepository.save(history);
        emailSender.sendEmail(email, code);
    }

    @Override
    @Transactional
    public void checkEmail(CheckEmailRequestDto requestDto) {
        String email = requestDto.getEmail();
        String code = requestDto.getCode();

        MailHistory mailHistory = mailHistoryRepository.findTop1ByEmailAndIsAuthedOrderByIdDesc(
                email, false);

        if (mailHistory == null) {
            throw new GlobalRuntimeException("메일 인증 요청 내역이 없습니다.", HttpStatus.NOT_FOUND);
        }

        if (!mailHistory.checkAuthCode(code)) {
            throw new GlobalRuntimeException("인증 코드가 다릅니다.", HttpStatus.CONFLICT);
        }

        if (mailHistory.isOverTimeLimit(LocalDateTime.now())) {
            throw new GlobalRuntimeException("인증 시간이 만료되었습니다.", HttpStatus.CONFLICT);
        }
    }

    @Override
    @Transactional
    public AuthResponseDto defaultSignIn(SignInRequestDto requestDto) {
        Member member = memberRepository.findByEmailAndProvider(requestDto.getEmail(),
                Provider.DEFAULT);

        if (member == null) {
            throw new GlobalRuntimeException("가입되지 않은 Email 입니다.", HttpStatus.NOT_FOUND);
        }

        String password = member.getPassword();
        boolean hasProfile = isProfileSaved(member.getEmail());

        if (!passwordEncoder.matches(requestDto.getPassword(), password)) {
            throw new GlobalRuntimeException("비밀번호가 틀립니다.", HttpStatus.BAD_REQUEST);
        }

        Token token = jwtTokenProvider.createToken(requestDto.getEmail());

        saveRefreshToken(requestDto, token);

        Long expirationTime = jwtTokenProvider.getExpirationTime(token.getAccessToken());
        TokenResponseDto tokenResponseDto = TokenResponseDto.from(token, expirationTime);
        AuthResponseDto authResponseDto = AuthResponseDto.builder()
                .hasProfile(hasProfile)
                .tokenResponseDto(tokenResponseDto)
                .build();

        return authResponseDto;
    }

    @Override
    @Transactional
    public TokenResponseDto refreshAccessToken(RefreshAccessTokenRequestDto requestDto) {

        String accessToken = jwtTokenProvider.refreshAccessToken(requestDto.getRefreshToken());
        Long expirationTime = jwtTokenProvider.getExpirationTime(accessToken);

        Token token = Token.builder()
                .accessToken(accessToken)
                .refreshToken(requestDto.getRefreshToken())
                .build();
        return TokenResponseDto.from(token, expirationTime);
    }


    private void saveRefreshToken(SignInRequestDto requestDto, Token token) {
        RefreshToken lastRefreshToken = refreshTokenRepository.findByEmail(requestDto.getEmail());
        if (lastRefreshToken != null) {
            refreshTokenRepository.deleteByEmail(requestDto.getEmail());
        }

        RefreshToken refreshToken = RefreshToken.builder()
                .token(token.getRefreshToken())
                .email(requestDto.getEmail())
                .build();

        refreshTokenRepository.save(refreshToken);
    }

    private String generateAuthCode() {
        return UUID.randomUUID().toString();
    }

    private void emailDupicationCheck(String email) {
        if (!Pattern.matches("\\w+@\\w+\\.\\w+(\\.\\w+)?", email)) {
            throw new GlobalRuntimeException("Email 형식이 잘못되었습니다.", HttpStatus.BAD_REQUEST);
        }

        Member member = memberRepository.findByEmail(email);

        if (member != null) {
            throw new GlobalRuntimeException("이미 존재하는 이메일입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private boolean isProfileSaved(String email) {
        Member member = memberRepository.findByEmail(email);

        if (member.getNickname() != null) {
            return true;
        }
        return false;
    }
}
