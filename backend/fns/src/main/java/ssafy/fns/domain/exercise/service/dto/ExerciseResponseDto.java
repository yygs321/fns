package ssafy.fns.domain.exercise.service.dto;


import java.util.List;
import lombok.Builder;
import lombok.Getter;
import ssafy.fns.domain.member.entity.Member;

@Getter
@Builder
public class ExerciseResponseDto {

    private List<Integer> sportsBookmarkList;
    private Double weight;
    private List<ExerciseDto> exerciseDtoList;

    public static ExerciseResponseDto from(Member member, List<Integer> sportsBookmarkList,
            List<ExerciseDto> exerciseDtoList) {
        return ExerciseResponseDto.builder()
                .sportsBookmarkList(sportsBookmarkList)
                .exerciseDtoList(exerciseDtoList)
                .weight(member.getWeightList().get(member.getWeightList().size() - 1)
                        .getWeight())
                .build();
    }
}
