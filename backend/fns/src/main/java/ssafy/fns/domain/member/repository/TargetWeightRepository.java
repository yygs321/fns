package ssafy.fns.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.fns.domain.member.entity.TargetWeight;

public interface TargetWeightRepository extends JpaRepository<TargetWeight, Long> {

    TargetWeight findByMember_Email(String Email);

}
