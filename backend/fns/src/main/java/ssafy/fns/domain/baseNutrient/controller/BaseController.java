package ssafy.fns.domain.baseNutrient.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.baseNutrient.controller.dto.BaseDietRequestDto;
import ssafy.fns.domain.baseNutrient.controller.dto.ModifyBaseRequestDto;
import ssafy.fns.domain.baseNutrient.service.BaseService;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping(value = "/api/base")
@Slf4j
public class BaseController {

    private final BaseService baseService;

    @PostMapping(value = "")
    public ResponseEntity<?> saveBase(@AuthenticationPrincipal Member member) {
        baseService.saveBase(member);
        return JsonResponse.ok("사용자 기준영양소 초기화 완료!");
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateBase(@AuthenticationPrincipal Member member,
            @RequestBody ModifyBaseRequestDto modifyRequestDto) {
        baseService.updateBase(member, modifyRequestDto);
        return JsonResponse.ok("기준 영양정보 수정 완료!");
    }

    @GetMapping(value = "/current")
    public ResponseEntity<?> selectCurrentBase(@AuthenticationPrincipal Member member) {
        return JsonResponse.ok("현재 기준 영양정보 조회 완료", baseService.selectCurrentBase(member));
    }

    @GetMapping(value = "")
    public ResponseEntity<?> selectBaseByDate(@AuthenticationPrincipal Member member,
            @RequestParam("date") String baseNutrientDate) {
        log.info(baseNutrientDate);
        return JsonResponse.ok(baseNutrientDate + "일자 기준 영양정보 조회 완료",
                baseService.selectBaseByDate(member, baseNutrientDate));
    }

    @PatchMapping("/diet")
    public ResponseEntity<?> dietMood(@AuthenticationPrincipal Member member,
            @RequestBody BaseDietRequestDto dietRequestDto) {
        return JsonResponse.ok("다이어트 모드 적용 완료",
                baseService.diet(member, dietRequestDto));
    }
}
