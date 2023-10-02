package ssafy.fns.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.fns.domain.member.entity.BaseNutrient;

public interface BaseRepository extends JpaRepository<BaseNutrient, Long> {

    BaseNutrient findFirstByMemberIdOrderByCreatedAtDesc(Long memberId);
}
