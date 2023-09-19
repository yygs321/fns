package ssafy.fns.domain.food.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.fns.domain.food.entity.Food;
import ssafy.fns.domain.food.entity.Intake;

public interface FoodRepository extends JpaRepository<Food, Long> {

}
