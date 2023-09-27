package ssafy.fns.domain.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.auth.service.dto.TokenDto;
import ssafy.fns.domain.member.controller.dto.EmailDuplicationRequestDto;
import ssafy.fns.domain.member.controller.dto.MemberProfileRequestDto;
import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;
import ssafy.fns.domain.member.controller.dto.UpdatePasswordRequestDto;
import ssafy.fns.domain.member.controller.dto.UpdateProfileRequestDto;
import ssafy.fns.domain.member.controller.dto.WeightRequestDto;
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

    @PostMapping(value = "/check-nickname-duplicate")
    public ResponseEntity<?> checkNicknameDuplicated(
            @RequestBody EmailDuplicationRequestDto requestDto) {
        memberService.checkNicknameDuplicated(requestDto);
        return JsonResponse.ok("사용가능한 닉네임 입니다");
    }

    @GetMapping
    public ResponseEntity<?> selectMemberProfile(@AuthenticationPrincipal Member member) {
        return JsonResponse.ok("멤버 회원정보 조회 성공!", memberService.selectMember(member));
    }

    @PatchMapping("/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal Member member,
            @RequestBody UpdateProfileRequestDto requestDto) {
        memberService.updateProfile(member, requestDto);
        return JsonResponse.ok("멤버 프로필 변경 성공!");
    }

    @PatchMapping
    public ResponseEntity<?> updatePassword(@AuthenticationPrincipal Member member,
            @RequestBody UpdatePasswordRequestDto requestDto) {
        memberService.updatePassword(member, requestDto);
        return JsonResponse.ok("회원 비밀번호 변경 성공!");
    }


    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal Member member,
            @RequestBody TokenDto tokenDto) {

        memberService.logout(member, tokenDto);
        return JsonResponse.ok("로그아웃이 완료되었습니다.");
    }

    @DeleteMapping
    public ResponseEntity<?> deleteMember(@AuthenticationPrincipal Member member,
            @RequestBody TokenDto tokenDto) {
        memberService.deleteMember(member, tokenDto);
        return JsonResponse.ok("회원 탈퇴가 완료되었습니다.");
    }

    @PostMapping("/weight")
    public ResponseEntity<?> addWeight(@RequestBody
            WeightRequestDto requestDto){
        return JsonResponse.ok("몸무게 등록이 완료되었습니다.", memberService.addWeight(new Member(), requestDto));
    }

//    @GetMapping("/weight")
//    public ResponseEntity<?> selectWeight(@AuthenticationPrincipal Member member, @RequestParam(value = "date")String date){
//        return JsonResponse.ok("몸무게 조회가 완료되었습니다.", memberService.selectAllWeight(member, date));
//    }
    @GetMapping("/weight")
    public ResponseEntity<?> selectWeight(@RequestParam(value = "date")String date){
        return JsonResponse.ok("몸무게 조회가 완료되었습니다.", memberService.selectAllWeight(new Member(), date));
    }
}
