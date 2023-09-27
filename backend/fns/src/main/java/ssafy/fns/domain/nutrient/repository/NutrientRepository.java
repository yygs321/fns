package ssafy.fns.domain.nutrient.repository;

import java.lang.annotation.Native;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.fns.domain.nutrient.entity.Nutrient;

public interface NutrientRepository extends JpaRepository<Nutrient, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM nutrient where (start_age <= :age and end_age >= :age) and gender like :gender")
    Optional<Nutrient> findByAgeAndGender(@Param("age") Long age, @Param("gender") String gender);
}
