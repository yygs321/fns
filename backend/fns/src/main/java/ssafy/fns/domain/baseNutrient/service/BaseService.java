package ssafy.fns.domain.baseNutrient.service;

import ssafy.fns.domain.baseNutrient.controller.dto.BaseDietRequestDto;
import ssafy.fns.domain.baseNutrient.controller.dto.ModifyBaseRequestDto;
import ssafy.fns.domain.baseNutrient.service.dto.BaseResponseDto;
import ssafy.fns.domain.member.entity.Member;

public interface BaseService {

    BaseResponseDto selectCurrentBase(Member member);

    void saveBase(Member member);

    void updateBase(Member member, ModifyBaseRequestDto modifyRequestDto);

    BaseResponseDto diet(Member member, BaseDietRequestDto dietRequestDto);

    BaseResponseDto selectBaseByDate(Member member, String baseNutrientDate);
}
