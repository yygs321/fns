package ssafy.fns.domain.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.member.controller.dto.TargetWeightRequestDto;
import ssafy.fns.domain.member.controller.dto.WeightRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.service.WeightService;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping(value = "/api/members")
@Slf4j
public class WeightController {

    private final WeightService weightService;

    @PostMapping("/weight")
    public ResponseEntity<?> saveWeight(@AuthenticationPrincipal Member member,
            @RequestBody WeightRequestDto requestDto) {
        weightService.saveWeight(member, requestDto);
        return JsonResponse.ok("몸무게 등록이 완료되었습니다.");
    }

    @PostMapping("/target-weight")
    public ResponseEntity<?> saveTargetWeight(@AuthenticationPrincipal Member member,
            @RequestBody TargetWeightRequestDto requestDto) {
        weightService.saveTargetWeight(member, requestDto);
        return JsonResponse.ok("감량 목표 등록 완료!");
    }

    @GetMapping("/target-weight")
    public ResponseEntity<?> selectTargetWeight(@AuthenticationPrincipal Member member) {
        return JsonResponse.ok("감량 목표 조회 완료!", weightService.selectTargetWeight(member));
    }

    //    @GetMapping("/weight")
//    public ResponseEntity<?> selectWeight(@AuthenticationPrincipal Member member, @RequestParam(value = "date")String date){
//        return JsonResponse.ok("몸무게 조회가 완료되었습니다.", memberService.selectAllWeight(member, date));
//    }
    @GetMapping("/weight")
    public ResponseEntity<?> selectWeight(@RequestParam(value = "date") String date) {
        return JsonResponse.ok("몸무게 조회가 완료되었습니다.",
                weightService.selectAllWeight(new Member(), date));
    }
}
