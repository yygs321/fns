package ssafy.fns.domain.baseNutrient.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.baseNutrient.entity.BaseNutrient;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BaseSimpleResponseDto {

    private Long id;

    private Double kcal;

    private Double carbs;

    private Double protein;

    private Double fat;


    public static BaseSimpleResponseDto from(BaseNutrient baseNutrient) {
        return BaseSimpleResponseDto.builder()
                .id(baseNutrient.getId())
                .kcal(baseNutrient.getKcal())
                .carbs(baseNutrient.getCarbs())
                .protein(baseNutrient.getProtein())
                .fat(baseNutrient.getFat())
                .build();
    }
}
