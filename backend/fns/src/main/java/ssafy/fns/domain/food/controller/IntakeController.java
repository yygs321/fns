package ssafy.fns.domain.food.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.food.controller.dto.IntakeDeletetRequestDto;
import ssafy.fns.domain.food.controller.dto.IntakeInsertRequestDto;
import ssafy.fns.domain.food.controller.dto.IntakeUpdateRequestDto;
import ssafy.fns.domain.food.service.IntakeService;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/intake")
@CrossOrigin("*")
@Slf4j
public class IntakeController {
    private final IntakeService intakeService;

    @ApiOperation(value = "섭취 내용 입력")
    @PostMapping("")
    public ResponseEntity<?> inputIntake(@AuthenticationPrincipal Member member, @RequestBody List<IntakeInsertRequestDto> requestDtoList){
        return JsonResponse.ok("완료", intakeService.insert(member, requestDtoList));
    }

    @ApiOperation(value = "섭취 내용 삭제")
    @DeleteMapping("")
    public ResponseEntity<?> deleteIntake(@AuthenticationPrincipal Member member, @RequestBody List<IntakeDeletetRequestDto> intakeIdList){
        return JsonResponse.ok(intakeService.delete(member.getId(), intakeIdList));
    }

    @ApiOperation(value = "섭취 내용 수정")
    @PatchMapping("")
    public ResponseEntity<?> updateIntake(@AuthenticationPrincipal Member member, @RequestBody List<IntakeUpdateRequestDto> requestDtoList){
        return JsonResponse.ok(intakeService.update(member.getId(), requestDtoList));
    }

    @ApiOperation(value = "섭취 내역 보기")
    @GetMapping("/{intake-id}")
    public ResponseEntity<?> selectOneIntake(@AuthenticationPrincipal Member member, @PathVariable(name = "intake-id") Long intakeId){
        return JsonResponse.ok("조회 완료", intakeService.selectOne(member.getId(), intakeId));
    }

    @ApiOperation(value = "일일 총 섭취 칼로리, 탄, 단, 지 보기")
    @GetMapping("/simple/{date}")
    public ResponseEntity<?> selectOneDateNutrient(@AuthenticationPrincipal Member member, @PathVariable(name = "date") String date){
        return JsonResponse.ok("조회 완료", intakeService.nutrientOnDate(member.getId(), date));
    }

    @ApiOperation(value = "일일 총 섭취 한 음식 이력, 칼로리, 탄, 단, 지 보기")
    @GetMapping("/total/{date}")
    public ResponseEntity<?> selectOneDate(@AuthenticationPrincipal Member member, @PathVariable(name = "date") String date){
        return JsonResponse.ok("조회 완료", intakeService.allOnDate(member.getId(), date));
    }
}
