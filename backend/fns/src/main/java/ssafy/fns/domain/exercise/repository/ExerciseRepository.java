package ssafy.fns.domain.exercise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.fns.domain.exercise.entity.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    @Query(nativeQuery = true,
            value = "SELECT * FROM exercise e WHERE e.member_id = :memberId AND e.sports_id=:sportsId AND DATE_FORMAT(e.exercise_date, '%Y-%m-%d') LIKE CONCAT(:exerciseDate, '%') ORDER BY e.created_At DESC limit 1")
    Exercise findTop1ByExerciseDateAndMember_IdAndSports_IdOrderByIdDesc(String exerciseDate,
            Long memberId,
            Long sportsId);

    @Query(nativeQuery = true,
            value = "SELECT * FROM exercise e WHERE e.member_id = :memberId AND DATE_FORMAT(e.exercise_date, '%Y-%m-%d') LIKE CONCAT(:exerciseDate, '%') ORDER BY e.created_At DESC limit 1")
    Exercise findFirstByExerciseDateAndMember_Id(String exerciseDate, Long memberId);

}
