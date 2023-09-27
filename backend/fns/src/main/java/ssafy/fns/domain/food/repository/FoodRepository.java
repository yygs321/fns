package ssafy.fns.domain.food.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.fns.domain.food.entity.Food;
import ssafy.fns.domain.food.service.dto.FoodSearchResponseDto;

public interface FoodRepository extends JpaRepository<Food, Long> {
    //@Query(nativeQuery = true, value = "SELECT food_id, name, volume, kcal, carbs, protein, fat, pollination, sugar, dietary_fiber, calcium, potassium, iron, phosphorus, sodium, vitaminA, vitaminC, vitaminD, cholesterol, acid, trans_fat FROM food WHERE name like %:name%")
    @Query(nativeQuery = true, value = "SELECT * FROM food WHERE name like %:name%")
    List<Food> findAllByName(@Param("name")String name);
}
