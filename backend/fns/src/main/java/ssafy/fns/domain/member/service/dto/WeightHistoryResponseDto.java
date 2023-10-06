package ssafy.fns.domain.member.service.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WeightHistoryResponseDto {

    private TargetWeightResponseDto targetWeightResponseDto;
    private List<WeightResponseDto> weightList;

    public static WeightHistoryResponseDto from(TargetWeightResponseDto targetWeightResponseDto,
            List<WeightResponseDto> weightList) {
        return WeightHistoryResponseDto.builder()
                .targetWeightResponseDto(targetWeightResponseDto)
                .weightList(weightList)
                .build();
    }
}
