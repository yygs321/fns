package ssafy.fns.domain.auth.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
@Slf4j
public class OAuthController {

    private final OAuthService oAuthService;

    @PostMapping(value = "/{social-login-type}")
    public ResponseEntity<?> socialLogin(
            @PathVariable(name = "social-login-type") String socialLoginType,
            @RequestBody OAuthLoginRequestDto requestDto) {
        log.info("DTO code = "+requestDto.getCode());
        OAuthLoginResponseDto oauthResponseDto = oAuthService.login(SocialLoginType.valueOf(socialLoginType.toUpperCase()),
                requestDto);

        if (oauthResponseDto.getTokenResponseDto() == null) {
            return JsonResponse.ok("signup", oauthResponseDto.getDetailDto());
        } else {
            return JsonResponse.ok("login", oauthResponseDto.getTokenResponseDto());
        }
    }
}
