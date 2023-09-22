package ssafy.fns.domain.follow.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.fns.domain.follow.entity.Follow;
import ssafy.fns.domain.follow.service.dto.FollowCheckResponseDto;
import ssafy.fns.domain.member.entity.Member;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    @Query(nativeQuery = true, value = "SELECT f.follow_id, m.member_id, f.is_valid FROM follow f inner join member m on (f.to_member_id=m.member_id)  WHERE f.from_member_id = :fromMemberId and f.to_member_id = :toMemberId")
    Optional<FollowCheckResponseDto> findMemberIdByFromMemberAndToMember(@Param("fromMemberId")Long fromMemberId, @Param("toMemberId")Long toMemberId);

    @Query(nativeQuery = true, value = "SELECT * FROM follow WHERE follow.from_member_id = :fromMemberId and is_valid = 1")
    List<Follow> findAllByFromMemberId(@Param("fromMemberId")Long fromMemberId);

    Optional<Follow> findByFromMemberIdAndToMemberId(@Param("fromMemberId")Long fromMemberId, @Param("toMemberId")Long toMemberId);

    //boolean findBytoMemberIdAndfromMemberId(Long toMemberId, Long fromMemberId);
}
