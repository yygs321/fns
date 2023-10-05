package ssafy.fns.domain.member.service.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String parsedCreatedAt = createdAt.format(formatter);
        
        return WeightResponseDto.builder()
                .weight(weight)
                .createdAt(parsedCreatedAt)
                .build();
    }
}
