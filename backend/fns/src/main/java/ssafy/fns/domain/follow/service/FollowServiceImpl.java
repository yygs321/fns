package ssafy.fns.domain.follow.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.follow.entity.Follow;
import ssafy.fns.domain.follow.repository.FollowRepository;
import ssafy.fns.domain.follow.service.dto.FollowCheckResponseDto;
import ssafy.fns.domain.follow.service.dto.FollowResponseDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class FollowServiceImpl implements FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    @Override
    public List<FollowResponseDto> followList(Long fromMemberId) {
        List<Follow> followList = followRepository.findAllByFromMemberId(fromMemberId);
        List<FollowResponseDto> responseDtoList = new ArrayList<>();
        for (Follow f: followList) {
            Member m = f.getToMember();
            responseDtoList.add(FollowResponseDto.builder()
                    .memberId(m.getId())
                    .nickName(m.getNickname())
                    .build()
            );
        }

        return responseDtoList;
    }

    @Override
    public String followInsert(Long fromMemberId,Long toMemberId) {
        Optional<FollowCheckResponseDto> OptionalCheck = followRepository.findMemberIdByFromMemberAndToMember(fromMemberId, toMemberId);

        if(OptionalCheck.isEmpty()){ // 팔로우 이력이 없음
            Optional<Member> fromMember = memberRepository.findById(fromMemberId);
            Optional<Member> toMember = memberRepository.findById(toMemberId);
            if(toMember.isEmpty() || fromMember.isEmpty()) {
                return "Member 정보 확인 필요";
            }
            Follow follow = new Follow(toMember.get(), fromMember.get());
            followRepository.save(follow);
            return "follow 성공";
        } else{
            FollowCheckResponseDto followCheckResponseDto = OptionalCheck.get();
            if(followCheckResponseDto.getIsValid()){ // 팔로우 하고 있는 경우
                return "이미 follow한 Member입니다.";
            }
            // 팔로우 취소했던 경우
            Follow follow = followRepository.findById(followCheckResponseDto.getFollowId()).get();
            follow.add();
            followRepository.save(follow);
            return "follow 성공";
        }
    }

    @Override
    public String foillowDelete(Long fromMemberId,Long toMemberId) {
        Optional<Follow> OptionalFollow = followRepository.findByFromMemberIdAndToMemberId(fromMemberId, toMemberId);

        if(OptionalFollow.isEmpty()){
            return "Member를 확인해주세요.";
        }

        Follow follow = OptionalFollow.get();
        follow.delete();
        followRepository.save(follow);

        return "Follow를 취소 했습니다.";
    }
}
