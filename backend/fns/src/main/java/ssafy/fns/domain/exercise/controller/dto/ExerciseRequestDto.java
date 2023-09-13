package ssafy.fns.domain.exercise.controller.dto;

import lombok.Getter;

/*
* 운동한 칼로리 저장 요청
* */

@Getter
public class ExerciseRequestDto {
    private Long exercise_id;

    private Long exerciseTime;
}
