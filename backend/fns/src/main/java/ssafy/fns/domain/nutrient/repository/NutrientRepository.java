package ssafy.fns.domain.nutrient.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.fns.domain.nutrient.entity.Nutrient;

public interface NutrientRepository extends JpaRepository<Nutrient, Long> {

    //    @Query(value = "SELECT n FROM Nutrient n where (n.startAge <=:age and n.endAge >=:age) and n.gender=:gender")
//    Nutrient findByAgeAndGender(Long age, String gender);
    @Query("SELECT n FROM Nutrient n WHERE n.startAge <= :age AND n.endAge >= :age AND n.gender = :gender")
    Nutrient findByAgeAndGender(@Param("age") Long age, @Param("gender") String gender);
}
