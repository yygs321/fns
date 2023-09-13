package ssafy.fns.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.fns.domain.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
