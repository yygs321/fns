package ssafy.fns.domain.exercise.service.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class sportsDto {

    private Long sportsId;
    private Long met;
    private Long exerciseTime;
}
