package ssafy.fns.domain.nutrient.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.fns.domain.nutrient.entity.Nutrient;

public interface NutrientRepository extends JpaRepository<Nutrient, Long> {

}
