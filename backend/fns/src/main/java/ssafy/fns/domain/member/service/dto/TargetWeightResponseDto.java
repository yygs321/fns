package ssafy.fns.domain.member.service.dto;

import java.time.Duration;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.entity.TargetWeight;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j
public class TargetWeightResponseDto {

    private Double initialWeight;
    private Double currentWeight;
    private Double targetWeight;
    private Long duration;
    private Long remainingDays;
    private Double progressRatio;

    public static TargetWeightResponseDto from(Member member) {
        Double currentWeight = member.getCurrentWeight();
        Double initialWeight = null;
        Double targetWeight = null; // 초기값으로 null 설정
        Double progressRatio = null; // 초기값으로 null 설정
        Long remainingDays = null; // 초기값으로 null 설정
        Long duration = null;

        TargetWeight targetWeightEntity = member.getTargetWeight();
        if (targetWeightEntity != null) {
            targetWeight = targetWeightEntity.getTargetWeight();
            initialWeight = targetWeightEntity.getInitialWeight();
            progressRatio = getProgressRatio(currentWeight, targetWeight, initialWeight);
            remainingDays = getRemaingingDays(member);
            duration = targetWeightEntity.getDietDuration();
        }

        return TargetWeightResponseDto.builder()
                .initialWeight(initialWeight)
                .currentWeight(currentWeight)
                .targetWeight(targetWeight)
                .duration(duration)
                .remainingDays(remainingDays)
                .progressRatio(progressRatio)
                .build();
    }

    @NotNull
    private static Double getProgressRatio(Double currentWeight, Double targetWeight,
            Double initialWeight) {
        if (initialWeight == targetWeight) {
            return 100.0;
        } else if (initialWeight > currentWeight) {
            log.info(String.valueOf(initialWeight), currentWeight);
            return 100.0 * (initialWeight - currentWeight) / (initialWeight - targetWeight);
        } else {
            return 0.0;
        }
    }

    @NotNull
    private static Long getRemaingingDays(Member member) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime createdAt = member.getTargetWeight().getCreatedAt();

        Duration currentDuration = Duration.between(createdAt, currentDateTime);
        return member.getTargetWeight().getDietDuration() - currentDuration.toDays();
    }
}
