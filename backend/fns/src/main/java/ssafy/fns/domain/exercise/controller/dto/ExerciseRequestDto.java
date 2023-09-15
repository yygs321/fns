package ssafy.fns.domain.exercise.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
* 운동한 칼로리 저장 요청
* */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExerciseRequestDto {
    private Long exercise_id;

    private Long exerciseTime;
}
