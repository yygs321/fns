package ssafy.fns.domain.exercise.service.dto;


import lombok.Builder;
import lombok.Getter;

/*
* 운동 별 1시간당 소비 칼로리 반환
* */
@Getter
@Builder
public class ExerciseResponseDto {
    private Long id;

    private String sportsName;

    private Double kcal;
}
