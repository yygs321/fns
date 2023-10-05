package ssafy.fns.domain.member.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.entity.Provider;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByEmail(String email);

    Member findByNickname(String nickname);

    Member findByEmailAndProvider(String email, Provider provider);

    @Query(nativeQuery = true, value = "SELECT * from member where nickname like %:nickname%")
    List<Member> findAllByNickname(@Param("nickname") String nickname);

    @Query(nativeQuery = true,
            value = "SELECT DISTINCT DATE_FORMAT(combined.date, '%Y-%m-%d') AS combinedDate\n"
                    + "FROM (\n"
                    + "    (SELECT i.date AS date FROM intake AS i\n"
                    + "    WHERE i.member_id = :memberId)\n"
                    + "    UNION\n"
                    + "    (SELECT e.exercise_date AS date FROM exercise AS e\n"
                    + "    WHERE e.member_id = :memberId)\n"
                    + ") AS combined\n"
                    + "WHERE DATE_FORMAT(combined.date, '%Y-%m') LIKE CONCAT('2023-10', '%')")
    List<String> findIntakeAndExerciseCreatedAtByMember_IdAndDate(Long memberId,
            String calendarDate);
}
