package ssafy.fns.domain.food.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.fns.domain.food.entity.Intake;

public interface InvakeRepository extends JpaRepository<Intake, Long> {

}
