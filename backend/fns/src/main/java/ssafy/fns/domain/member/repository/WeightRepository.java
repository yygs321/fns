package ssafy.fns.domain.member.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import ssafy.fns.domain.member.entity.Weight;

public interface WeightRepository extends CrudRepository<Weight, Long> {

    //    @Query(nativeQuery = true, value = "select * from weight_history "
//            + "where created_at IN("
//            + "SELECT MAX(created_at) AS created_at "
//            + "FROM weight_history "
//            + "GROUP BY date(created_at)) "
//            + "AND (date(created_at) >= :startDate and date(created_at) < :EndDate) "
//            + "and member_id = :memberId order by created_at")
//    List<Weight> findAllByDateAndMemberId(@Param("startDate") String startDate,
//            @Param("EndDate") String EndDate, @Param("memberId") Long memberId);
//    @Query(value = "SELECT w FROM Weight w WHERE w.member.id = :memberId AND DATE_FORMAT(:targetWeightCreatedAt, '%Y-%m-%d') <=DATE_FORMAT(w.createdAt, '%Y-%m-%d')")


    @Query("SELECT w.id FROM Weight w WHERE w.member.id = :memberId AND DATE_FORMAT(:targetWeightCreatedAt, '%Y-%m-%d') <=DATE_FORMAT(w.createdAt, '%Y-%m-%d')")
    List<Long> findAllWeightIdByTargetWeightCreatAtAndMemberId(Long memberId,
            LocalDateTime targetWeightCreatedAt);

    Optional<Weight> findById(Long id);
}
