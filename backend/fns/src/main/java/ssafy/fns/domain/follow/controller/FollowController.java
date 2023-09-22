package ssafy.fns.domain.follow.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.follow.service.FollowService;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/follow")
@CrossOrigin("*")
@Slf4j
public class FollowController {
    private final FollowService followService;
//    @GetMapping("")
//    public ResponseEntity<?> followCheck(@AuthenticationPrincipal Member member, @PathVariable(name = "memeber_id") Long member_id){
//        return JsonResponse.ok("팔로우 조회 완료");
//    }
//    @PostMapping("/{member-id}")
//    public ResponseEntity<?> followAdd(@AuthenticationPrincipal Member member, @PathVariable(name = "memeber_id") Long member_id){
//        return JsonResponse.ok("팔로우 등록 완료");
//    }
//
//    @DeleteMapping("/{member-id}")
//    public ResponseEntity<?> followDelete(@AuthenticationPrincipal Member member, @PathVariable(name = "memeber_id") Long member_id){
//        return JsonResponse.ok("팔로우 삭제 완료");
//    }
    @GetMapping("")
    public ResponseEntity<?> followCheck(){
        return JsonResponse.ok("팔로우 조회 완료", followService.followList(1L));
    }
    @PostMapping("/{member-id}")
    public ResponseEntity<?> followAdd(@PathVariable(name = "member-id") Long toMemberId){
        return JsonResponse.ok(followService.followInsert(1L, toMemberId));
    }

    @DeleteMapping("/d/{member-id}")
    public ResponseEntity<?> followDelete(@PathVariable(name = "member-id") Long toMemberId){
        return JsonResponse.ok("팔로우 삭제 완료", followService.foillowDelete(1L, toMemberId));
    }
}
