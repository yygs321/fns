package ssafy.fns.domain.exercise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.fns.domain.exercise.entity.Sports;

public interface SportsRepository extends JpaRepository<Sports, Long> {

}
