package ssafy.fns.domain.member.service;

import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.member.controller.dto.BaseDietRequestDto;
import ssafy.fns.domain.member.controller.dto.BaseModifyRequestDto;
import ssafy.fns.domain.member.entity.BaseNutrient;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.repository.BaseRepository;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.domain.member.service.dto.BaseResponseDto;
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
    public BaseResponseDto selectOne(Long memberId) {
//        Optional<BaseHistory> optionalBase = baseHistoryRepository.findByMemberId(memberId);
//        if (!optionalBase.isPresent()) {
//            throw new GlobalRuntimeException("영양 정보 입력을 먼저 해주세요.", HttpStatus.BAD_REQUEST);
//        }
//
//        return BaseResponseDto.from(optionalBase.get());
        return null;
    }

    @Override
    @Transactional
    public void saveBase(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail());

        Nutrient nutrient = nutrientRepository.findByAgeAndGender(findMember.getAge(),
                findMember.getGender());

        if (nutrient == null) {
            throw new GlobalRuntimeException("나이 정보를 확인해주세요.", HttpStatus.BAD_REQUEST);
        }

        BaseNutrient baseNutrient = BaseNutrient.builder()
                .member(findMember)
                .kcal(nutrient.getKcal())
                .carbs(nutrient.getCarbs())
                .protein(nutrient.getProtein())
                .fat(nutrient.getFat())
                .pollination(nutrient.getPollination())
                .sugar(nutrient.getSugar())
                .dietaryFiber(nutrient.getDietaryFiber())
                .calcium(nutrient.getCalcium())
                .potassium(nutrient.getPotassium())
                .iron(nutrient.getIron())
                .phosphorus(nutrient.getPhosphorus())
                .sodium(nutrient.getSodium())
                .vitaminA(nutrient.getVitaminA())
                .vitaminC(nutrient.getVitaminC())
                .vitaminD(nutrient.getVitaminD())
                .cholesterol(nutrient.getCholesterol())
                .acid(nutrient.getAcid())
                .transFat(nutrient.getTransFat())
                .build();

        baseRepository.save(baseNutrient);
    }

    @Override
    @Transactional
    public String updateBase(Long memberId, BaseModifyRequestDto modifyRequestDto) {
//        Optional<BaseHistory> optionalBase = baseHistoryRepository.findByMemberId(memberId);
//        if (!optionalBase.isPresent()) {
//            throw new GlobalRuntimeException("영양 정보 입력을 먼저 해주세요.", HttpStatus.BAD_REQUEST);
//        }
//
//        BaseHistory baseHistory = optionalBase.get();
//        baseHistory.update(modifyRequestDto);
//        baseHistoryRepository.save(baseHistory);
//        return "수정 완료";
        return null;
    }

    @Override
    @Transactional
    public BaseResponseDto diet(Long memberId, BaseDietRequestDto dietRequestDto) {
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
}


