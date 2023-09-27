package ssafy.fns.domain.food.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.food.controller.dto.IntakeInsertRequestDto;
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

//    @PostMapping("")
//    public ResponseEntity<?> inputIntake(@AuthenticationPrincipal Member member, @RequestBody IntakeInsertRequestDto requestDto){
//        return JsonResponse.ok("완료", intakeService.insert(member, requestDto));
//    }

//    @DeleteMapping("/{intake-id}")
//    public ResponseEntity<?> deleteIntake(@AuthenticationPrincipal Member member, @PathVariable(name = "intake-id") Long intakeId){
//        return JsonResponse.ok(intakeService.delete(member.getId(), intakeId));
//    }
//    @GetMapping("/{intake-id}")
//    public ResponseEntity<?> selectOneIntake(@AuthenticationPrincipal Member member, @PathVariable(name = "intake-id") Long intakeId){
//        return JsonResponse.ok("조회 완료", intakeService.selectOne(member.getId(), intakeId));
//    }
//    @GetMapping("/total/{date}")
//    public ResponseEntity<?> selectOneDateIntake(@AuthenticationPrincipal Member member, @PathVariable(name = "date") String date){
//        return JsonResponse.ok("조회 완료", intakeService.onDate(member.getId(), date));
//    }
    @PostMapping("")
    public ResponseEntity<?> inputIntake(@RequestBody IntakeInsertRequestDto requestDto){
        return JsonResponse.ok("완료", intakeService.insert(new Member(), requestDto));
    }

    @DeleteMapping("/{intake-id}")
    public ResponseEntity<?> deleteIntake(@PathVariable(name = "intake-id") Long intakeId){
        return JsonResponse.ok(intakeService.delete(1L, intakeId));
    }

    @GetMapping("/{intake-id}")
    public ResponseEntity<?> selectOneIntake(@PathVariable(name = "intake-id") Long intakeId){
        return JsonResponse.ok("조회 완료", intakeService.selectOne(1L, intakeId));
    }

    @GetMapping("/total/{date}")
    public ResponseEntity<?> selectOneDateIntake(@PathVariable(name = "date") String date){
        return JsonResponse.ok("조회 완료", intakeService.onDate(1L, date));
    }
}
