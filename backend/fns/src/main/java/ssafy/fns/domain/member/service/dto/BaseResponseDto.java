package ssafy.fns.domain.member.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.member.entity.BaseNutrient;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BaseResponseDto {

    private Long id;

    private Double kcal;

    private Double carbs;

    private Double protein;

    private Double fat;

    private Double pollination;

    private Double sugar;

    private Double dietaryFiber;

    private Double calcium;

    private Double potassium;

    private Double iron;

    private Double phosphorus;

    private Double sodium;

    private Double vitaminA;

    private Double vitaminC;

    private Double vitaminD;

    private Double cholesterol;

    private Double acid;

    private Double transFat;

    public static BaseResponseDto from(BaseNutrient baseNutrient) {
        return BaseResponseDto.builder()
                .id(baseNutrient.getId())
                .kcal(baseNutrient.getKcal())
                .carbs(baseNutrient.getCarbs())
                .protein(baseNutrient.getProtein())
                .fat(baseNutrient.getFat())
                .pollination(baseNutrient.getPollination())
                .sugar(baseNutrient.getSugar())
                .dietaryFiber(baseNutrient.getDietaryFiber())
                .calcium(baseNutrient.getCalcium())
                .potassium(baseNutrient.getPotassium())
                .iron(baseNutrient.getIron())
                .phosphorus(baseNutrient.getPhosphorus())
                .sodium(baseNutrient.getSodium())
                .vitaminA(baseNutrient.getVitaminA())
                .vitaminC(baseNutrient.getVitaminC())
                .vitaminD(baseNutrient.getVitaminD())
                .cholesterol(baseNutrient.getCholesterol())
                .acid(baseNutrient.getAcid())
                .transFat(baseNutrient.getTransFat())
                .build();
    }
}
