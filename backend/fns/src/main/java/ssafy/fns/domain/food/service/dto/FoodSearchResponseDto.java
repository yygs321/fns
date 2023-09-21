package ssafy.fns.domain.food.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.food.entity.Food;

/*
* 음식 검색 반환
* */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodSearchResponseDto {
    private Long foodId;

    private String name;

    private int volume;

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

    public static FoodSearchResponseDto from(Food food) {
        return FoodSearchResponseDto.builder()
                .foodId(food.getId())
                .name(food.getName())
                .volume(food.getVolume())
                .kcal(food.getKcal())
                .carbs(food.getCarbs())
                .protein(food.getProtein())
                .fat(food.getFat())
                .pollination(food.getPollination())
                .sugar(food.getSugar())
                .dietaryFiber(food.getDietaryFiber())
                .calcium(food.getCalcium())
                .potassium(food.getPotassium())
                .iron(food.getIron())
                .phosphorus(food.getPhosphorus())
                .sodium(food.getSodium())
                .vitaminA(food.getVitaminA())
                .vitaminC(food.getVitaminC())
                .vitaminD(food.getVitaminD())
                .cholesterol(food.getCholesterol())
                .acid(food.getAcid())
                .transFat(food.getTransFat())
                .build();
    }
}
