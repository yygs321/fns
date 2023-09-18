package ssafy.fns.domain.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.member.controller.dto.EmailRequestDto;
import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;
import ssafy.fns.domain.member.service.MemberService;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequestMapping(value = "/api/members")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {

    private final MemberService memberService;

    @PostMapping(value = "/email-check")
    public ResponseEntity<?> emailDuplicationCheck(@RequestBody EmailRequestDto requestDto) {
        memberService.emailDuplicationCheck(requestDto.getEmail());
        return JsonResponse.ok("이메일 중복 체크 성공!");
    }


    @PostMapping(value = "/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto requestDto) {
        memberService.signUp(requestDto);
        return JsonResponse.ok("회원가입 성공!");
    }

}
