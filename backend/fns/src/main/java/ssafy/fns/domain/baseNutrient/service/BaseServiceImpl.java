package ssafy.fns.domain.baseNutrient.service;

import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.baseNutrient.controller.dto.BaseDietRequestDto;
import ssafy.fns.domain.baseNutrient.controller.dto.ModifyBaseRequestDto;
import ssafy.fns.domain.baseNutrient.entity.BaseNutrient;
import ssafy.fns.domain.baseNutrient.repository.BaseRepository;
import ssafy.fns.domain.baseNutrient.service.dto.BaseResponseDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.domain.nutrient.entity.Nutrient;
import ssafy.fns.domain.nutrient.repository.NutrientRepository;
import ssafy.fns.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
public class BaseServiceImpl implements BaseService {

    private final BaseRepository baseRepository;
    private final NutrientRepository nutrientRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void saveBase(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail());

        Nutrient nutrient = nutrientRepository.findByAgeAndGender(findMember.getAge(),
                findMember.getGender());

        if (nutrient == null) {
            throw new GlobalRuntimeException("프로필 정보를 확인해주세요.", HttpStatus.BAD_REQUEST);
        }

        BaseNutrient baseNutrient = BaseNutrient.from(findMember, nutrient);

        findMember.addBaseNutrient(baseNutrient);
        baseRepository.save(baseNutrient);
    }

    @Override
    @Transactional
    public void updateBase(Member member, ModifyBaseRequestDto modifyRequestDto) {
        Member findMember = memberRepository.findByEmail(member.getEmail());

        BaseNutrient newBaseNutrient = BaseNutrient.from(findMember, modifyRequestDto);

        findMember.addBaseNutrient(newBaseNutrient);
        baseRepository.save(newBaseNutrient);
    }

    @Override
    @Transactional
    public BaseResponseDto selectCurrentBase(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail());
        BaseNutrient baseNutrient = baseRepository.findFirstByMemberIdOrderByCreatedAtDesc(
                findMember.getId());

        return BaseResponseDto.from(baseNutrient);
    }


    @Override
    @Transactional
    public BaseResponseDto diet(Member member, BaseDietRequestDto dietRequestDto) {
//        Optional<BaseHistory> optionalBase = baseHistoryRepository.findByMemberId(memberId);
//        if (!optionalBase.isPresent()) {
//            throw new GlobalRuntimeException("영양 정보 입력을 먼저 해주세요.", HttpStatus.BAD_REQUEST);
//        }
//
//        BaseHistory baseHistory = optionalBase.get();
//        baseHistory.diet(dietRequestDto.getRate());
//        baseHistoryRepository.save(baseHistory);
//        return BaseResponseDto.from(baseHistory);
        return null;
    }

    @Override
    @Transactional
    public BaseResponseDto selectBaseByDate(Member member, String baseNutrientDate) {
        Member findMember = memberRepository.findByEmail(member.getEmail());
        List<BaseNutrient> baseNutrientList = baseRepository.findAllByMemberIdAndCreatedAtOrderByCreatedAtDesc(
                findMember.getId(), baseNutrientDate);

        if (baseNutrientList == null || baseNutrientList.isEmpty()) {
            return BaseResponseDto.from(null);
        }

        return BaseResponseDto.from(baseNutrientList.get(0));
    }
}


