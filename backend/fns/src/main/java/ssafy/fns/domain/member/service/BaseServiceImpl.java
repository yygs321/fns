package ssafy.fns.domain.member.service;

import java.util.Optional;
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

//    @Override
//    public BaseResponseDto selectOne(Member member) {
//        Optional<Base> optionalBase = baseRepository.findByMemberId(member.getId());
//        if (!optionalBase.isPresent()) throw new GlobalRuntimeException("영양 정보 입력을 먼저 해주세요.",HttpStatus.BAD_REQUEST);
//
//        return BaseResponseDto.from(optionalBase.get());
//    }
//    @Override
//    public String input(Member member) {
//        Optional<Nutrient> nutrient = nutrientRepository.findByAge(member.getAge());
//        if (!nutrient.isPresent()) throw new GlobalRuntimeException("나이 정보를 확인해주세요.", HttpStatus.BAD_REQUEST);
//
//        Optional<Base> optionalBase = baseRepository.findByMemberId(1L);
//        Base base = null;
//        if (!optionalBase.isPresent()) { // 기존에 영양 정보가 없으면
//            base = new Base();
//            base.clear(member, nutrient.get());
//        }else {
//            base = optionalBase.get();
//            base.clear(member, nutrient.get());
//        }
//        baseRepository.save(base);
//        return "영양 정보 입력 성공";
//    }
//    @Override
//    public String update(Member member, BaseModifyRequestDto modifyRequestDto) {
//        Optional<Base> optionalBase = baseRepository.findByMemberId(member.getId());
//        if (!optionalBase.isPresent()) throw new GlobalRuntimeException("영양 정보 입력을 먼저 해주세요.",HttpStatus.BAD_REQUEST);
//
//        Base base = optionalBase.get();
//        base.update(modifyRequestDto);
//        baseRepository.save(base);
//        return "수정 완료";
//    }

    @Override
    public BaseResponseDto selectOne(Member member) {
        Optional<BaseNutrient> optionalBase = baseRepository.findByMemberId(1L);
        if (!optionalBase.isPresent()) {
            throw new GlobalRuntimeException("영양 정보 입력을 먼저 해주세요.", HttpStatus.BAD_REQUEST);
        }

        return BaseResponseDto.from(optionalBase.get());
    }

    @Override
    public String input(Member member) {
        Optional<Member> m = memberRepository.findById(1L);

        Optional<Nutrient> nutrient = nutrientRepository.findByAgeAndGender(m.get().getAge(),
                m.get().getGender());
        if (!nutrient.isPresent()) {
            throw new GlobalRuntimeException("나이 정보를 확인해주세요.", HttpStatus.BAD_REQUEST);
        }

        Optional<BaseNutrient> optionalBase = baseRepository.findByMemberId(1L);
        BaseNutrient baseNutrient = null;
        if (!optionalBase.isPresent()) { // 기존에 영양 정보가 없으면
            baseNutrient = new BaseNutrient();
            baseNutrient.clear(m.get(), nutrient.get());
        } else {
            baseNutrient = optionalBase.get();
            baseNutrient.clear(m.get(), nutrient.get());
        }
        baseRepository.save(baseNutrient);

        return "영양 정보 입력 성공";
    }

    @Override
    public String update(Member member, BaseModifyRequestDto modifyRequestDto) {
        Optional<BaseNutrient> optionalBase = baseRepository.findByMemberId(1L);
        if (!optionalBase.isPresent()) {
            throw new GlobalRuntimeException("영양 정보 입력을 먼저 해주세요.", HttpStatus.BAD_REQUEST);
        }

        BaseNutrient baseNutrient = optionalBase.get();
        baseNutrient.update(modifyRequestDto);
        baseRepository.save(baseNutrient);
        return "수정 완료";
    }

    @Override
    public BaseResponseDto diet(Member member, BaseDietRequestDto dietRequestDto) {
        Optional<BaseNutrient> optionalBase = baseRepository.findByMemberId(1L);
        if (!optionalBase.isPresent()) {
            throw new GlobalRuntimeException("영양 정보 입력을 먼저 해주세요.", HttpStatus.BAD_REQUEST);
        }

        BaseNutrient baseNutrient = optionalBase.get();
        baseNutrient.diet(dietRequestDto.getRate());
        baseRepository.save(baseNutrient);
        return BaseResponseDto.from(baseNutrient);
    }
}


