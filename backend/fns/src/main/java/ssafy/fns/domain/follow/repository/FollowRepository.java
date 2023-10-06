package ssafy.fns.domain.follow.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.fns.domain.follow.entity.Follow;
import ssafy.fns.domain.follow.service.dto.FollowCheckResponseDto;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    @Query(value = "SELECT new ssafy.fns.domain.follow.service.dto.FollowCheckResponseDto(f.id, m.id, f.isValid) FROM Follow f inner join Member m on (f.toMember.id=m.id)  WHERE f.fromMember.id = :fromMemberId and f.toMember.id = :toMemberId")
    Optional<FollowCheckResponseDto> findMemberIdByFromMemberAndToMember(@Param("fromMemberId")Long fromMemberId, @Param("toMemberId")Long toMemberId);

    @Query(nativeQuery = true, value = "SELECT * FROM follow WHERE follow.from_member_id = :fromMemberId and is_valid = true")
    List<Follow> findAllByFromMemberId(@Param("fromMemberId")Long fromMemberId);

    Optional<Follow> findByFromMemberIdAndToMemberId(@Param("fromMemberId")Long fromMemberId, @Param("toMemberId")Long toMemberId);

    //boolean findBytoMemberIdAndfromMemberId(Long toMemberId, Long fromMemberId);
}
