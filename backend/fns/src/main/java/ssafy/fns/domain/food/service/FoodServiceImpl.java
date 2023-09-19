package ssafy.fns.domain.food.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.food.entity.Food;
import ssafy.fns.domain.food.repository.FoodRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class FoodServiceImpl implements FoodService {
    private final FoodRepository foodRepository;
    @Override
    public void inputFood(Food food) {
        foodRepository.save(food);
    }
}
