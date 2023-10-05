package ssafy.fns.domain.follow.service;

import java.time.LocalDate;
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
import ssafy.fns.domain.food.entity.Intake;
import ssafy.fns.domain.food.repository.IntakeRepository;
import ssafy.fns.domain.food.service.dto.IntakeSelectOneResponseDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.domain.member.service.dto.MemberListResponseDto;
import ssafy.fns.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
@Slf4j
public class FollowServiceImpl implements FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final IntakeRepository intakeRepository;
    @Override
    public List<FollowResponseDto> followList(Long fromMemberId) {
        List<Follow> followList = followRepository.findAllByFromMemberId(fromMemberId);
        List<FollowResponseDto> responseDtoList = new ArrayList<>();
        for (Follow f: followList) {
            Member m = f.getToMember();
            LocalDate date = LocalDate.now();
            String today = String.valueOf(date);
            List<Optional<Intake>> intakeList = intakeRepository.findAllByDateAndMemberId(today, m.getId());

            Double kcal = (double) 0L;
            Double carbs = (double) 0L;
            Double protein = (double) 0L;
            Double fat = (double) 0L;
            List<IntakeSelectOneResponseDto> intakes = new ArrayList<>();

            for(Optional<Intake> optionalIntake : intakeList){
                intakes.add(IntakeSelectOneResponseDto.from(optionalIntake.get()));
                kcal += optionalIntake.get().getFood().getKcal();
                carbs += optionalIntake.get().getFood().getCarbs();
                protein += optionalIntake.get().getFood().getProtein();
                fat += optionalIntake.get().getFood().getFat();
            }

            responseDtoList.add(FollowResponseDto.builder()
                            .memberId(m.getId())
                            .nickName(m.getNickname())
                            .kcal(kcal)
                            .carbs(carbs)
                            .protein(protein)
                            .fat(fat)
                            .intake(intakes)
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

    @Override
    public List<MemberListResponseDto> selectAll(Long fromMemberId, String nickname) {
        List<MemberListResponseDto> memberList = new ArrayList<>();
        List<Member> selectedMembers = memberRepository.findAllByNickname(nickname);

        for(Member member : selectedMembers){
            if (!member.getIsPublished()) continue;

            Optional<Follow> follow = followRepository.findByFromMemberIdAndToMemberId(fromMemberId, member.getId());
            // 이미 팔로우 한 경우
            if(!follow.isPresent()){
                memberList.add(MemberListResponseDto.from(member, true));
            }else{ // 팔로우 아직 안 한 경우
                memberList.add(MemberListResponseDto.from(member, false));
            }
        }

        return memberList;
    }
}
