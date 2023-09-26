package ssafy.fns.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.entity.Provider;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByEmail(String email);

    Member findByNickname(String nickname);

    Member findByEmailAndProvider(String email, Provider provider);
}
