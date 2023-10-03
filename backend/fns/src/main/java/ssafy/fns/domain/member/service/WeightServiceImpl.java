package ssafy.fns.domain.member.service;

import java.time.Duration;
import java.time.LocalDateTime;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.member.controller.dto.TargetWeightRequestDto;
import ssafy.fns.domain.member.controller.dto.WeightRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.entity.TargetWeight;
import ssafy.fns.domain.member.entity.Weight;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.domain.member.repository.TargetWeightRepository;
import ssafy.fns.domain.member.repository.WeightRepository;
import ssafy.fns.domain.member.service.dto.TargetWeightResponseDto;

@Service
@RequiredArgsConstructor
public class WeightServiceImpl implements WeightService {

    private final MemberRepository memberRepository;
    private final WeightRepository weightRepository;
    private final TargetWeightRepository targetWeightRepository;

    @Override
    @Transactional
    public void saveWeight(Member member, WeightRequestDto requestDto) {
        Member findMember = memberRepository.findByEmail(member.getEmail());
        Weight weight = Weight.from(findMember, requestDto);
        weightRepository.save(weight);
    }

//    @Override
//    @Transactional
//    public List<Weight> selectAllWeight(Member member, String date) {
//        String startyear = date.substring(0, 4);
//        String startMonth = date.substring(5, 7);
//        int month = Integer.parseInt(startMonth) + 1;
//        String year = "";
//        if (month > 12) {
//            month = 1;
//            int tempYear = Integer.parseInt(startyear) + 1;
//            year = String.valueOf(tempYear) + "-";
//        } else {
//            year = startyear + "-";
//        }
//        String endMonth = String.valueOf(month);
//        String startDate = year + startMonth + "-01";
//        String endDate = year + endMonth + "-01";
//
//        System.out.println("시작 : " + startDate);
//        System.out.println("끝 : " + endDate);
//        List<Weight> optionalList = weightRepository.findAllByDateAndMemberId(
//                startDate, endDate, 1L);
//        if (optionalList.isEmpty()) {
//            throw new GlobalRuntimeException("몸무게 기록이 없습니다", HttpStatus.BAD_REQUEST);
//        }
//        return optionalList;
//    }

    @Override
    @Transactional
    public void saveTargetWeight(Member member, TargetWeightRequestDto requestDto) {
        Member findMember = memberRepository.findByEmail(member.getEmail());

        if (findMember.getTargetWeight() != null) {
            targetWeightRepository.delete(findMember.getTargetWeight());
        }

        TargetWeight targetWeight = TargetWeight.from(findMember, requestDto);

        targetWeightRepository.save(targetWeight);
        findMember.updateTarget(targetWeight);
    }

    @Override
    @Transactional
    public TargetWeightResponseDto selectTargetWeight(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail());

        return TargetWeightResponseDto.from(findMember);
    }

    @NotNull
    private static Long getRemaingingDays(Member member) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime createdAt = member.getTargetWeight().getCreatedAt();

        Duration currentDuration = Duration.between(createdAt, currentDateTime);
        return member.getTargetWeight().getDietDuration() - currentDuration.toDays();
    }

}
