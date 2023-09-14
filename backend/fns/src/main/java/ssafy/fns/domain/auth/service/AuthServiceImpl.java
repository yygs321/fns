package ssafy.fns.domain.auth.service;

import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.auth.controller.dto.SignInRequestDto;
import ssafy.fns.domain.auth.entity.RefreshToken;
import ssafy.fns.domain.auth.repository.RefreshTokenRepository;
import ssafy.fns.domain.auth.service.dto.TokenDto;
import ssafy.fns.domain.auth.vo.Token;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.entity.Provider;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.global.exception.GlobalRuntimeException;
import ssafy.fns.global.security.JwtTokenProvider;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;


    @Override
    @Transactional
    public TokenDto defaultSignIn(SignInRequestDto requestDto) {
        Member member = memberRepository.findByEmailAndProvider(requestDto.getEmail(),
                Provider.DEFAULT);

        if (member == null) {
            throw new GlobalRuntimeException("가입되지 않은 Email 입니다.", HttpStatus.NOT_FOUND);
        }

        String password = member.getPassword();

        if (!passwordEncoder.matches(requestDto.getPassword(), password)) {
            throw new GlobalRuntimeException("비밀번호가 틀립니다.", HttpStatus.BAD_REQUEST);
        }

        Token token = jwtTokenProvider.createToken(requestDto.getEmail());

        saveRefreshToken(requestDto, token);

        return TokenDto.from(token);
    }

    private void saveRefreshToken(SignInRequestDto requestDto, Token token) {
        RefreshToken lastRefreshToken = refreshTokenRepository.findByEmail(requestDto.getEmail());
        if (lastRefreshToken != null) {
            refreshTokenRepository.deleteByEmail(requestDto.getEmail());
        }

        RefreshToken refreshToken = RefreshToken.builder()
                .token(token.getRefreshToken())
                .email(requestDto.getEmail()).build();

        refreshTokenRepository.save(refreshToken);
    }
}
