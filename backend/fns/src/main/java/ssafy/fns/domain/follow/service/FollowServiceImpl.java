package ssafy.fns.domain.follow.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.follow.entity.Follow;
import ssafy.fns.domain.follow.repository.FollowRepository;
import ssafy.fns.domain.follow.service.dto.FollowCheckResponseDto;
import ssafy.fns.domain.follow.service.dto.FollowResponseDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.global.exception.GlobalRuntimeException;

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
    public String insertFollow(Long fromMemberId,Long toMemberId) {
        if(fromMemberId == toMemberId){ // 자기 자신을 팔로우 하려는 경우
            throw new GlobalRuntimeException("Member 정보 확인 필요", HttpStatus.BAD_REQUEST);
        }
        
        Optional<FollowCheckResponseDto> OptionalCheck = followRepository.findMemberIdByFromMemberAndToMember(fromMemberId, toMemberId);

        if(OptionalCheck.isEmpty()){ // 팔로우 이력이 없음
            Optional<Member> fromMember = memberRepository.findById(fromMemberId);
            Optional<Member> toMember = memberRepository.findById(toMemberId);
            if(toMember.isEmpty() || fromMember.isEmpty()) {
                throw new GlobalRuntimeException("Member 정보 확인 필요", HttpStatus.BAD_REQUEST);
            }
            Follow follow = new Follow(toMember.get(), fromMember.get());
            followRepository.save(follow);
            return "follow 성공";
        } else{
            FollowCheckResponseDto followCheckResponseDto = OptionalCheck.get();
            if(followCheckResponseDto.getIsValid()){ // 팔로우 하고 있는 경우
                throw new GlobalRuntimeException("이미 follow한 Member입니다.", HttpStatus.BAD_REQUEST);
            }
            // 팔로우 취소했던 경우
            Follow follow = followRepository.findById(followCheckResponseDto.getFollowId()).get();
            follow.add();
            followRepository.save(follow);
            return "follow 성공";
        }
    }

    @Override
    public String deleteFollow(Long fromMemberId,Long toMemberId) {
        Optional<Follow> OptionalFollow = followRepository.findByFromMemberIdAndToMemberId(fromMemberId, toMemberId);

        if(OptionalFollow.isEmpty()){
            throw new GlobalRuntimeException("Member 정보 확인 필요", HttpStatus.BAD_REQUEST);
        }

        Follow follow = OptionalFollow.get();
        follow.delete();
        followRepository.save(follow);

        return "Follow를 취소 했습니다.";
    }
}
