package ssafy.fns.domain.member.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import ssafy.fns.domain.member.entity.Weight;

public interface WeightRepository extends CrudRepository<Weight, Long> {

    @Query("SELECT MAX(w.id) FROM Weight w WHERE w.member.id = :memberId "
            + "AND DATE_FORMAT(:targetWeightCreatedAt, '%Y-%m-%d') <=DATE_FORMAT(w.createdAt, '%Y-%m-%d')"
            + "GROUP BY DATE_FORMAT(w.createdAt, '%Y-%m-%d')")
    List<Long> findAllWeightIdByTargetWeightCreatAtAndMemberId(Long memberId,
            LocalDateTime targetWeightCreatedAt);

    Optional<Weight> findById(Long id);
}
