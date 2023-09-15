package ssafy.fns.domain.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.auth.controller.dto.CheckEmailRequestDto;
import ssafy.fns.domain.auth.controller.dto.SendEmailRequestDto;
import ssafy.fns.domain.auth.controller.dto.SignInRequestDto;
import ssafy.fns.domain.auth.service.AuthService;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final AuthService service;

    @PostMapping("/api/auth/sign-in")
    public ResponseEntity<?> defaultSignIn(@RequestBody SignInRequestDto requestDto) {
        return JsonResponse.ok("로그인 성공!", service.defaultSignIn(requestDto));
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody SendEmailRequestDto requestDto) {
        service.sendEmail(requestDto);
        return JsonResponse.ok("Email 전송 성공!!");
    }

    @PostMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestBody CheckEmailRequestDto requestDto) {
        service.checkEmail(requestDto);
        return JsonResponse.ok("Email 체크 성공!!");
    }

}
