package ssafy.fns.domain.food.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.food.entity.Food;
import ssafy.fns.domain.food.repository.FoodRepository;
import ssafy.fns.domain.food.service.dto.FoodSearchResponseDto;

@Service
@RequiredArgsConstructor
@Slf4j
public class FoodServiceImpl implements FoodService {
    private final FoodRepository foodRepository;
    @Override
    public void inputFood(Food food) {
        foodRepository.save(food);
    }

    @Override
    public List<FoodSearchResponseDto> searchFood(String name) {
        List<FoodSearchResponseDto> foodList = foodRepository
                .findAllByName(name)
                .stream()
                .map(food ->
                        FoodSearchResponseDto.from(food))
                .toList();

        return foodList;
    }
}
