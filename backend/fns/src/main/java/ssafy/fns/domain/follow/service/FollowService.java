package ssafy.fns.domain.follow.service;

import java.util.List;
import ssafy.fns.domain.follow.service.dto.FollowResponseDto;
import ssafy.fns.domain.member.service.dto.MemberListResponseDto;

public interface FollowService {
    List<FollowResponseDto> followList(Long fromMemberId);
    String insertFollow(Long FromMemberId,Long toMemberId);
    String deleteFollow(Long FromMemberId,Long toMemberId);
    List<MemberListResponseDto> selectAll(Long fromMemberId, String nickname);
}
