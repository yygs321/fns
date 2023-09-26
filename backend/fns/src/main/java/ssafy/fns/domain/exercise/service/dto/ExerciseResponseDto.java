package ssafy.fns.domain.exercise.service.dto;


import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ExerciseResponseDto {

    private List<Integer> sportsBookmarkList;
    private Long weight;
    private List<sportsDto> sportsDtoList;
}
