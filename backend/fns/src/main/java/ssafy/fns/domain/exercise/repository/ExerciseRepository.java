package ssafy.fns.domain.exercise.repository;

import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.fns.domain.exercise.entity.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    Exercise findByExerciseDateAndMember_IdAndSports_Id(LocalDate exerciseDate, Long memberId,
            Long sportsId);

    Exercise findTop1ByExerciseDate(LocalDate exerciseDate);
}
