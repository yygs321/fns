package ssafy.fns.domain.member.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.member.controller.dto.MemberProfileRequestDto;
import ssafy.fns.domain.member.entity.Base;
import ssafy.fns.global.response.BaseResponse;

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

    public static BaseResponseDto from(Base base) {
        return BaseResponseDto.builder()
                .id(base.getId())
                .kcal(base.getKcal())
                .carbs(base.getCarbs())
                .protein(base.getProtein())
                .fat(base.getFat())
                .pollination(base.getPollination())
                .sugar(base.getSugar())
                .dietaryFiber(base.getDietaryFiber())
                .calcium(base.getCalcium())
                .potassium(base.getPotassium())
                .iron(base.getIron())
                .phosphorus(base.getPhosphorus())
                .sodium(base.getSodium())
                .vitaminA(base.getVitaminA())
                .vitaminC(base.getVitaminC())
                .vitaminD(base.getVitaminD())
                .cholesterol(base.getCholesterol())
                .acid(base.getAcid())
                .transFat(base.getTransFat())
                .build();
    }
}
