package ssafy.fns.domain.member.controller;

import lombok.Getter;
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
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.member.controller.dto.BaseDietRequestDto;
import ssafy.fns.domain.member.controller.dto.BaseModifyRequestDto;
import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.service.BaseService;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping(value = "/api/base")
@Slf4j
public class BaseController {

    private final BaseService baseService;

    @GetMapping(value = "")
    public ResponseEntity<?> myBase(@AuthenticationPrincipal Member member){
        return JsonResponse.ok("조회 완료", baseService.selectOne(member.getId()));
    }

    @PostMapping(value = "")
    public ResponseEntity<?> inputBase(@AuthenticationPrincipal Member member) {
        return JsonResponse.ok(baseService.input(member.getId()));
    }
    @PatchMapping("")
    public ResponseEntity<?> updateBase(@AuthenticationPrincipal Member member, @RequestBody BaseModifyRequestDto modifyRequestDto) {
        return JsonResponse.ok(baseService.update(member.getId(), modifyRequestDto));
    }

    @PatchMapping("/diet")
    public ResponseEntity<?> dietMood(@AuthenticationPrincipal Member member, @RequestBody BaseDietRequestDto dietRequestDto) {
        return JsonResponse.ok("다이어트 모드 적용 완료",baseService.diet(member.getId(), dietRequestDto));
    }
}
