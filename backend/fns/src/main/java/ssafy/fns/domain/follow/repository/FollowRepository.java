package ssafy.fns.domain.follow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.fns.domain.follow.entity.Follow;

public interface FollowRepository extends JpaRepository<Follow, Long> {

}