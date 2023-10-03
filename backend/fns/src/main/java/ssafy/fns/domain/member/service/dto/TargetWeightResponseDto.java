package ssafy.fns.domain.member.service.dto;

import java.time.Duration;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;
import ssafy.fns.domain.member.entity.Member;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TargetWeightResponseDto {

    private Double currentWeight;
    private Double targetWeight;
    private Long duration;
    private Long remainingDays;
    private Double progressRatio;

    public static TargetWeightResponseDto from(Member member) {
        Double currentWeight = member.getCurrentWeight();
        Double targetWeight = member.getTargetWeight().getTargetWeight();
        Double initialWeight = member.getTargetWeight().getInitialWeight();
        Double progressRatio = getProgressRatio(currentWeight, targetWeight, initialWeight);
        Long remainingDays = getRemaingingDays(member);

        return TargetWeightResponseDto.builder()
                .currentWeight(currentWeight)
                .targetWeight(targetWeight)
                .duration(member.getTargetWeight().getDietDuration())
                .remainingDays(remainingDays)
                .progressRatio(progressRatio)
                .build();
    }

    @NotNull
    private static Double getProgressRatio(Double currentWeight, Double targetWeight,
            Double initialWeight) {
        Double progressRatio = 0.0;

        if (currentWeight != targetWeight) {
            progressRatio =
                    ((initialWeight - currentWeight) / (initialWeight - targetWeight)) * 100;
        }
        return progressRatio;
    }

    @NotNull
    private static Long getRemaingingDays(Member member) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime createdAt = member.getTargetWeight().getCreatedAt();

        Duration currentDuration = Duration.between(createdAt, currentDateTime);
        return member.getTargetWeight().getDietDuration() - currentDuration.toDays();
    }
}
