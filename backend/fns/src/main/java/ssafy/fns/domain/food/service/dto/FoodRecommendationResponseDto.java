package ssafy.fns.domain.food.service.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodRecommendationResponseDto {
    private Long food_id;

    private String name;

    private int kcal;

    private Long carbs;

    private Long protein;

    private Long fat;
}
