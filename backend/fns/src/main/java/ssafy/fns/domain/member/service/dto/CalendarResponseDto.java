package ssafy.fns.domain.member.service.dto;


import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.member.entity.Member;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CalendarResponseDto {

    private List<String> recordedDates;

    public static CalendarResponseDto from(Member member, List<String> recordedDates) {
        return CalendarResponseDto.builder()
                .recordedDates(recordedDates).build();
    }
}
