package ssafy.fns.domain.member.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.fns.domain.member.entity.Base;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.entity.Provider;

public interface BaseRepository extends JpaRepository<Base, Long> {

    Optional<Base> findByMemberId(Long id);
}
