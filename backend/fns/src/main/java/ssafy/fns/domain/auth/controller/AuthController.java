package ssafy.fns.domain.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.auth.controller.dto.CheckEmailRequestDto;
import ssafy.fns.domain.auth.controller.dto.EmailRequestDto;
import ssafy.fns.domain.auth.controller.dto.RefreshAccessTokenRequestDto;
import ssafy.fns.domain.auth.controller.dto.SignInRequestDto;
import ssafy.fns.domain.auth.service.AuthService;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-in")
    public ResponseEntity<?> defaultSignIn(@RequestBody SignInRequestDto requestDto) {
        return JsonResponse.ok("로그인 성공!", authService.defaultSignIn(requestDto));
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequestDto requestDto) {
        authService.sendEmail(requestDto);
        return JsonResponse.ok("Email 전송 성공!!");
    }

    @PostMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestBody CheckEmailRequestDto requestDto) {
        authService.checkEmail(requestDto);
        return JsonResponse.ok("Email 체크 성공!!");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshAccessTokenRequestDto requestDto) {
        return JsonResponse.ok("액세스토큰 재발급 완료", authService.refreshAccessToken(requestDto));
    }
}
