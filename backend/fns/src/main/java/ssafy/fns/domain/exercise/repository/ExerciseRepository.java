package ssafy.fns.domain.exercise.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.fns.domain.exercise.entity.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    List<Exercise> findAllByExerciseDate(LocalDateTime exerciseDate);

}
