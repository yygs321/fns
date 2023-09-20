package ssafy.fns.domain.auth.service;

import java.util.Map;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import ssafy.fns.domain.auth.service.dto.OAuthDetailDto;
import ssafy.fns.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
@Slf4j
public class KakaoProvider implements OAuthProvider {


    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String KAKAO_CLIENT_KEY;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String KAKAO_REDIRECT_URI;
    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    private String KAKAO_USER_URL;
    private static final String KAKAO_BASE_URL = "https://kauth.kakao.com";


    @Override
    @Transactional
    public String getToken(String code) {
        WebClient kakaoOAuthWebClient = getKakaoClient(KAKAO_BASE_URL);

        String accessTokenUri = buildAccessTokenUri(code);

        Map result = kakaoOAuthWebClient.post()
                .uri(accessTokenUri)
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (result == null) {
            throw new GlobalRuntimeException("카카오 access token을 받아오지 못함.", HttpStatus.BAD_REQUEST);
        }

        return (String) result.get("access_token");
    }

    @Override
    @Transactional
    public String buildAccessTokenUri(String code) {
        StringBuilder sb = new StringBuilder();
        final String URI_PREFIX = "/oauth/token";
        sb.append(URI_PREFIX)
                .append("?grant_type=authorization_code")
                .append("&redirect_uri=").append(KAKAO_REDIRECT_URI)
                .append("&client_id=").append(KAKAO_CLIENT_KEY)
                .append("&code=").append(code);
        return sb.toString();
    }

    @Override
    @Transactional
    public OAuthDetailDto getOAuthDetail(String token) {
        WebClient kakaoUserDetailClient = getKakaoClient(KAKAO_USER_URL);

        Map user_info = getUserInfo(token, kakaoUserDetailClient);

        if (user_info == null) {
            throw new GlobalRuntimeException("카카오 사용자 정보를 받아오지 못함", HttpStatus.BAD_REQUEST);
        }

        Map<String, Object> properties = (Map<String, Object>) user_info.get("properties");
        Map<String, Object> kakao_account = (Map<String, Object>) user_info.get("kakao_account");

        String email = (String) kakao_account.get("email");
        String name = (String) properties.get("nickname");

        OAuthDetailDto detailDto = OAuthDetailDto.builder()
                .name(name)
                .email(email)
                .build();

        return detailDto;
    }

    @Nullable
    private static Map<String, Object> getUserInfo(String token, WebClient kakaoUserDetailClient) {
        Map user_info = kakaoUserDetailClient.get()
                .header("Authorization", "Bearer " + token)
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(Map.class)
                .block();
        return user_info;
    }

    private static WebClient getKakaoClient(String kakaoUrl) {
        return WebClient.builder()
                .baseUrl(kakaoUrl)
                .build();
    }
}
