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
    private List<Double> exerciseTimeList;

    public static ExerciseResponseDto from(Member member, List<Integer> sportsBookmarkList,
            List<Double> exerciseTimeList) {
        return ExerciseResponseDto.builder()
                .sportsBookmarkList(sportsBookmarkList)
                .weight(member.getCurrentWeight())
                .exerciseTimeList(exerciseTimeList)
                .build();
    }
}
