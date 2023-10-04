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
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.member.controller.dto.WeightRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.service.WeightService;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping(value = "/api/weight")
@Slf4j
public class WeightController {

    private final WeightService weightService;

    @PostMapping()
    public ResponseEntity<?> saveWeight(@AuthenticationPrincipal Member member,
            @RequestBody WeightRequestDto requestDto) {
        weightService.saveWeight(member, requestDto);
        return JsonResponse.ok("몸무게 등록이 완료되었습니다.");
    }

//    @GetMapping()
//    public ResponseEntity<?> selectWeight(@RequestParam(value = "date") String date) {
//        return JsonResponse.ok("몸무게 조회가 완료되었습니다.",
//                weightService.selectAllWeight(new Member(), date));
//    }

    @GetMapping("/history")
    private ResponseEntity<?> selectWeightHistory(@AuthenticationPrincipal Member member) {
        return JsonResponse.ok("몸무게 히스토리 조회", weightService.selectWeightHistory(member));
    }
}
