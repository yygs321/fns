package ssafy.fns.domain.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.member.controller.dto.MemberProfileRequestDto;
import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.service.MemberService;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping(value = "/api/members")
@Slf4j
public class MemberController {

    private final MemberService memberService;


    @PostMapping(value = "/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto requestDto) {
        memberService.signUp(requestDto);
        return JsonResponse.ok("회원가입 성공!");
    }


    @PostMapping(value = "/profile")
    public ResponseEntity<?> saveProfile(@AuthenticationPrincipal Member member,
            @RequestBody MemberProfileRequestDto requestDto) {

        memberService.saveProfile(member, requestDto);
        return JsonResponse.ok("프로필 등록 성공!");
    }

    //TODO: 회원가입 하고나서 닉네임 안정했을때 로그인시 이를 검증하는 필터 구현해야댐

}
