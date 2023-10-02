package ssafy.fns.domain.exercise.service.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ExerciseDto {

    private Long sportsId;
    private Double met;
    private Long exerciseTime;
}
