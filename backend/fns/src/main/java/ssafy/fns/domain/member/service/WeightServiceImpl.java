package ssafy.fns.domain.member.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
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
import ssafy.fns.domain.member.service.dto.WeightHistoryResponseDto;
import ssafy.fns.domain.member.service.dto.WeightResponseDto;

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

    @Override
    @Transactional
    public WeightHistoryResponseDto selectWeightHistory(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail());
        TargetWeightResponseDto targetWeightResponseDto = selectTargetWeight(findMember);
        TargetWeight targetWeight = findMember.getTargetWeight();
        List<Long> weightIdList = new ArrayList<>();

        if (targetWeight != null) {
            weightIdList = weightRepository.findAllWeightIdByTargetWeightCreatAtAndMemberId(
                    findMember.getId(), targetWeight.getCreatedAt());
        }

        if (weightIdList.isEmpty()) {
            return WeightHistoryResponseDto.from(targetWeightResponseDto, null);
        }

        List<WeightResponseDto> weightResponseDtoList = new ArrayList<>();
        getWeightResponseDtoListValue(weightIdList, weightResponseDtoList);

        return WeightHistoryResponseDto.from(targetWeightResponseDto, weightResponseDtoList);
    }

    private void getWeightResponseDtoListValue(List<Long> weightIdList,
            List<WeightResponseDto> weightResponseDtoList) {
        for (Long id : weightIdList) {
            Optional<Weight> weightOptional = weightRepository.findById(id);
            if (weightOptional.isPresent()) {
                Weight weight = weightOptional.get();
                WeightResponseDto weightResponseDto =
                        WeightResponseDto.from(weight.getWeight(), weight.getCreatedAt());
                weightResponseDtoList.add(weightResponseDto);
            }
        }
    }


}
