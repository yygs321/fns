package ssafy.fns.domain.exercise.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.exercise.controller.dto.ExerciseRequestDto;
import ssafy.fns.domain.exercise.service.ExerciseService;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/exercise")
@CrossOrigin("*")
@Slf4j
public class ExerciseController {

    private final ExerciseService exerciseService;

    @PostMapping
    public ResponseEntity<?> saveExercise(@AuthenticationPrincipal Member member,
            @RequestBody ExerciseRequestDto requestDto) {
        exerciseService.saveExercise(member, requestDto);
        return JsonResponse.ok("운동 저장!");
    }
}
