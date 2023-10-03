package ssafy.fns.domain.member.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.fns.domain.member.entity.Weight;

public interface WeightRepository extends JpaRepository<Weight, Long> {

    @Query(nativeQuery = true, value = "select * from weight_history "
            + "where created_at IN("
            + "SELECT MAX(created_at) AS created_at "
            + "FROM weight_history "
            + "GROUP BY date(created_at)) "
            + "AND (date(created_at) >= :startDate and date(created_at) < :EndDate) "
            + "and member_id = :memberId order by created_at")
    List<Weight> findAllByDateAndMemberId(@Param("startDate") String startDate,
            @Param("EndDate") String EndDate, @Param("memberId") Long memberId);
}
