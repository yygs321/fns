package ssafy.fns.domain.member.service;

import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.member.controller.dto.WeightRequestDto;
import ssafy.fns.domain.member.controller.dto.WeightTargetRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.entity.Weight;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.domain.member.repository.WeightRepository;
import ssafy.fns.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
public class WeightServiceImpl implements WeightService {

    private final MemberRepository memberRepository;
    private final WeightRepository weightRepository;

    @Override
    @Transactional
    public void saveWeight(Member member, WeightRequestDto requestDto) {
        Weight weight = Weight.builder()
                .member(member)
                .weight(requestDto.getWeight())
                .build();
        weightRepository.save(weight);
    }

    @Override
    @Transactional
    public List<Weight> selectAllWeight(Member member, String date) {
        String startyear = date.substring(0, 4);
        String startMonth = date.substring(5, 7);
        int month = Integer.parseInt(startMonth) + 1;
        String year = "";
        if (month > 12) {
            month = 1;
            int tempYear = Integer.parseInt(startyear) + 1;
            year = String.valueOf(tempYear) + "-";
        } else {
            year = startyear + "-";
        }
        String endMonth = String.valueOf(month);
        String startDate = year + startMonth + "-01";
        String endDate = year + endMonth + "-01";

        System.out.println("시작 : " + startDate);
        System.out.println("끝 : " + endDate);
        List<Weight> optionalList = weightRepository.findAllByDateAndMemberId(
                startDate, endDate, 1L);
        if (optionalList.isEmpty()) {
            throw new GlobalRuntimeException("몸무게 기록이 없습니다", HttpStatus.BAD_REQUEST);
        }
        return optionalList;
    }

    @Override
    public void saveTargetWeight(Member member, WeightTargetRequestDto requestDto) {
        Member findeMember = memberRepository.findByEmail(member.getEmail());

    }

}
