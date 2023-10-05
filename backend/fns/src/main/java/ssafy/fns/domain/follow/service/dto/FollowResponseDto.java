package ssafy.fns.domain.follow.service.dto;


import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.baseNutrient.service.dto.BaseSimpleResponseDto;
import ssafy.fns.domain.food.service.dto.IntakeSelectOneResponseDto;

@Getter
@NoArgsConstructor
@Builder
public class FollowResponseDto {
    private Long memberId;

    private String nickName;

    private Double kcal;

    private Double carbs;

    private Double protein;

    private Double fat;

    private List<IntakeSelectOneResponseDto> intake;

    private BaseSimpleResponseDto baseNutrient;

    @Builder
    public FollowResponseDto(Long memberId, String nickName, Double kcal, Double carbs,
            Double protein,
            Double fat, List<IntakeSelectOneResponseDto> intake, BaseSimpleResponseDto baseSimpleResponseDto) {
        this.memberId = memberId;
        this.nickName = nickName;
        this.kcal = kcal;
        this.carbs = carbs;
        this.protein = protein;
        this.fat = fat;
        this.intake = intake;
        this.baseNutrient = baseSimpleResponseDto;
    }
}
