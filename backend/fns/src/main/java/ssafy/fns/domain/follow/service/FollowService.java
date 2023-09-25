package ssafy.fns.domain.follow.service;

import java.util.List;
import ssafy.fns.domain.follow.service.dto.FollowResponseDto;

public interface FollowService {
    List<FollowResponseDto> followList(Long fromMemberId);
    String insertFollow(Long FromMemberId,Long toMemberId);
    String deleteFollow(Long FromMemberId,Long toMemberId);
}
