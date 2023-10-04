package ssafy.fns.domain.member.service.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WeightResponseDto {

    private Double weight;
    private LocalDateTime createdAt;

    public static WeightResponseDto from(Double weight, LocalDateTime createdAt) {
        return WeightResponseDto.builder()
                .weight(weight)
                .createdAt(createdAt)
                .build();
    }
}
