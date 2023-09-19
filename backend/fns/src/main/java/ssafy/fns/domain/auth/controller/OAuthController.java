package ssafy.fns.domain.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.auth.controller.dto.OAuthLoginRequestDto;
import ssafy.fns.domain.auth.service.OAuthService;
import ssafy.fns.domain.auth.service.dto.OAuthLoginResponseDto;
import ssafy.fns.domain.auth.utility.SocialLoginType;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping(value = "/api/auth")
public class OAuthController {

    private final OAuthService oauthService;

    @PostMapping(value = "/{social-login-type}")
    public ResponseEntity<?> socialLogin(
            @PathVariable(name = "social-login-type") SocialLoginType socialLoginType,
            OAuthLoginRequestDto requestDto) {
        OAuthLoginResponseDto oauthResponseDto = oauthService.login(socialLoginType,
                requestDto);

        if (oauthResponseDto.getTokenResponseDto() == null) {
            return JsonResponse.ok("signup", oauthResponseDto.getDetailDto());
        } else {
            return JsonResponse.ok("login", oauthResponseDto.getTokenResponseDto());
        }
    }
}
