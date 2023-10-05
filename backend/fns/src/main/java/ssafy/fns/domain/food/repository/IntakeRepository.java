package ssafy.fns.domain.food.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.fns.domain.food.entity.Intake;

public interface IntakeRepository extends JpaRepository<Intake, Long> {

    @Query(nativeQuery = true, value = "select * from intake where date(date) = :date and member_id = :memberId")
    List<Optional<Intake>> findAllByDateAndMemberId(@Param("date") String date,
            @Param("memberId") Long memberId);

    @Query(nativeQuery = true, value = "select * from intake where date = :date")
    List<Optional<Intake>> findAllByDate(@Param("date") String date);
}
