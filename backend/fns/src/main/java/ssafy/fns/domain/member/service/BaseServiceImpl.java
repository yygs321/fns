package ssafy.fns.domain.member.service;

import java.util.Optional;
import java.util.regex.Pattern;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.member.controller.dto.BaseDietRequestDto;
import ssafy.fns.domain.member.controller.dto.BaseModifyRequestDto;
import ssafy.fns.domain.member.controller.dto.MemberProfileRequestDto;
import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;
import ssafy.fns.domain.member.entity.Base;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.entity.Provider;
import ssafy.fns.domain.member.repository.BaseRepository;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.domain.member.service.dto.BaseResponseDto;
import ssafy.fns.domain.nutrient.entity.Nutrient;
import ssafy.fns.domain.nutrient.repository.NutrientRepository;
import ssafy.fns.global.exception.GlobalRuntimeException;
import ssafy.fns.global.response.BaseResponse;

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
        Optional<Base> optionalBase = baseRepository.findByMemberId(1L);
        if (!optionalBase.isPresent()) throw new GlobalRuntimeException("영양 정보 입력을 먼저 해주세요.",HttpStatus.BAD_REQUEST);

        return BaseResponseDto.from(optionalBase.get());
    }

    @Override
    public String input(Member member) {
        Optional<Member> m = memberRepository.findById(1L);

        Optional<Nutrient> nutrient = nutrientRepository.findByAgeAndGender(m.get().getAge(), m.get().getGender());
        if (!nutrient.isPresent()) throw new GlobalRuntimeException("나이 정보를 확인해주세요.", HttpStatus.BAD_REQUEST);

        Optional<Base> optionalBase = baseRepository.findByMemberId(1L);
        Base base = null;
        if (!optionalBase.isPresent()) { // 기존에 영양 정보가 없으면
            base = new Base();
            base.clear(m.get(), nutrient.get());
        }else {
            base = optionalBase.get();
            base.clear(m.get(), nutrient.get());
        }
        baseRepository.save(base);

        return "영양 정보 입력 성공";
    }

    @Override
    public String update(Member member, BaseModifyRequestDto modifyRequestDto) {
        Optional<Base> optionalBase = baseRepository.findByMemberId(1L);
        if (!optionalBase.isPresent()) throw new GlobalRuntimeException("영양 정보 입력을 먼저 해주세요.",HttpStatus.BAD_REQUEST);

        Base base = optionalBase.get();
        base.update(modifyRequestDto);
        baseRepository.save(base);
        return "수정 완료";
    }


    @Override
    public BaseResponseDto diet(Member member, BaseDietRequestDto dietRequestDto) {
        Optional<Base> optionalBase = baseRepository.findByMemberId(1L);
        if (!optionalBase.isPresent()) throw new GlobalRuntimeException("영양 정보 입력을 먼저 해주세요.",HttpStatus.BAD_REQUEST);

        Base base = optionalBase.get();
        base.diet(dietRequestDto.getRate());
        baseRepository.save(base);
        return BaseResponseDto.from(base);
    }
}


