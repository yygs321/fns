package ssafy.fns.domain.member.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TargetWeightResponseDto {

    private Double currentWeight;
    private Double targetWeight;
    private Long duration;
    private Long remainingDays;
}
