package ssafy.fns.domain.member.repository;

import java.util.List;
import java.util.Optional;
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
}
