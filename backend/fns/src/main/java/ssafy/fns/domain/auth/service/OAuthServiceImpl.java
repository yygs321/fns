package ssafy.fns.domain.auth.service;

import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.auth.controller.dto.OAuthLoginRequestDto;
import ssafy.fns.domain.auth.entity.RefreshToken;
import ssafy.fns.domain.auth.repository.RefreshTokenRepository;
import ssafy.fns.domain.auth.service.dto.OAuthDetailDto;
import ssafy.fns.domain.auth.service.dto.OAuthLoginResponseDto;
import ssafy.fns.domain.auth.service.dto.TokenResponseDto;
import ssafy.fns.domain.auth.utility.SocialLoginType;
import ssafy.fns.domain.auth.vo.Token;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.global.exception.GlobalRuntimeException;
import ssafy.fns.global.security.JwtTokenProvider;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuthServiceImpl implements OAuthService {

    private final GoogleProvider googleProvider;
    private final KakaoProvider kakaoProvider;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;


    @Override
    @Transactional
    public OAuthLoginResponseDto login(SocialLoginType socialLoginType,
            OAuthLoginRequestDto requestDto) {
        String accessToken;
        OAuthLoginResponseDto oAuthLoginResponseDto;
        TokenResponseDto tokenResponseDto;

        OAuthProvider oauthProvider = findSocialProvider(socialLoginType);
        accessToken = oauthProvider.getToken(requestDto.getCode());

        OAuthDetailDto detailDto = getUserDetail(socialLoginType, accessToken);
        checkEmailDuplicated(socialLoginType, detailDto.getEmail());
        boolean hasProfile = isProfileSaved(detailDto.getEmail());

        Token token = jwtTokenProvider.createToken(detailDto.getEmail());
        saveRefreshToken(detailDto.getEmail(), token);
        Long expirationTime = jwtTokenProvider.getExpirationTime(token.getAccessToken());
        tokenResponseDto = TokenResponseDto.from(token, expirationTime);

        oAuthLoginResponseDto = OAuthLoginResponseDto.builder()
                .hasProfile(hasProfile)
                .tokenResponseDto(tokenResponseDto)
                .detailDto(detailDto)
                .socialLoginType(socialLoginType.toString())
                .build();

        return oAuthLoginResponseDto;
    }

    private OAuthProvider findSocialProvider(SocialLoginType socialLoginType) {
        final OAuthProvider oAuthProvider;

        switch (socialLoginType) {
            case GOOGLE -> {
                oAuthProvider = googleProvider;
            }
            case KAKAO -> {
                oAuthProvider = kakaoProvider;
            }
            default -> {
                throw new GlobalRuntimeException("알 수 없는 소셜 로그인 형식입니다.",
                        HttpStatus.BAD_REQUEST);
            }
        }
        return oAuthProvider;
    }

    private OAuthDetailDto getUserDetail(SocialLoginType socialLoginType, String token) {
        OAuthProvider oAuthProvider = findSocialProvider(socialLoginType);

        return oAuthProvider.getOAuthDetail(token);
    }

    private boolean isProfileSaved(String email) {
        Member member = memberRepository.findByEmail(email);

        if (member != null && member.getNickname() != null) {
            return true;
        }
        return false;
    }

    private void checkEmailDuplicated(SocialLoginType socialLoginType, String email) {
        Member member = memberRepository.findByEmail(email);

        if (member != null) {
            checkProvider(socialLoginType, member);
        }
    }

    private static void checkProvider(SocialLoginType socialLoginType, Member member) {
        if (!member.getProvider().toString().equals(socialLoginType.toString())) {
            throw new GlobalRuntimeException(member.getProvider() + "으로 가입된 이메일입니다.",
                    HttpStatus.CONFLICT);
        }
    }

    private void saveRefreshToken(String email, Token token) {
        RefreshToken lastRefreshToken = refreshTokenRepository.findByEmail(email);
        if (lastRefreshToken != null) {
            refreshTokenRepository.deleteByEmail(email);
        }

        RefreshToken refreshToken = RefreshToken.builder()
                .token(token.getRefreshToken())
                .email(email)
                .build();

        refreshTokenRepository.save(refreshToken);
    }
}
