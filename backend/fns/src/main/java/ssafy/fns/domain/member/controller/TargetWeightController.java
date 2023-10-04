package ssafy.fns.domain.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.member.controller.dto.TargetWeightRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.service.WeightService;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping(value = "/api/target-weight")
public class TargetWeightController {

    private final WeightService weightService;

    @PostMapping()
    public ResponseEntity<?> saveTargetWeight(@AuthenticationPrincipal Member member,
            @RequestBody TargetWeightRequestDto requestDto) {
        weightService.saveTargetWeight(member, requestDto);
        return JsonResponse.ok("감량 목표 등록 완료!");
    }

    @GetMapping()
    public ResponseEntity<?> selectTargetWeight(@AuthenticationPrincipal Member member) {
        return JsonResponse.ok("감량 목표 조회 완료!", weightService.selectTargetWeight(member));
    }
}
