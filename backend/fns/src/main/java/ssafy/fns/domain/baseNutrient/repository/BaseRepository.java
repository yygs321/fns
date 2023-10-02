package ssafy.fns.domain.baseNutrient.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.fns.domain.baseNutrient.entity.BaseNutrient;

public interface BaseRepository extends JpaRepository<BaseNutrient, Long> {

    BaseNutrient findFirstByMemberIdOrderByCreatedAtDesc(Long memberId);

    @Query(value = "SELECT b FROM BaseNutrient b WHERE b.member.id = :memberId AND TO_CHAR(b.createdAt, 'YYYY-MM-DD') LIKE CONCAT(:baseNutrientDate, '%') ORDER BY b.createdAt DESC")
    List<BaseNutrient> findAllByMemberIdAndCreatedAtOrderByCreatedAtDesc(Long memberId,
            String baseNutrientDate);
}
