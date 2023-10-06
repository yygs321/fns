package ssafy.fns.domain.food.service.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/*
* 추천 음식 반환용
* */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodRecommendationResponseDto {
    private Long food_id;

    private String name;

    private Double kcal;

    private Double carbs;

    private Double protein;

    private Double fat;
}
