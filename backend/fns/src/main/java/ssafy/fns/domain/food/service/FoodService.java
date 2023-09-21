package ssafy.fns.domain.food.service;

import java.util.List;
import ssafy.fns.domain.food.entity.Food;
import ssafy.fns.domain.food.service.dto.FoodSearchResponseDto;

public interface FoodService {
    void inputFood(Food food);
    List<FoodSearchResponseDto> searchFood(String name);
}
