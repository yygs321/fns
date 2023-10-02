package ssafy.fns.domain.member.service;

import ssafy.fns.domain.member.controller.dto.BaseDietRequestDto;
import ssafy.fns.domain.member.controller.dto.BaseModifyRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.service.dto.BaseResponseDto;

public interface BaseService {

    BaseResponseDto selectOne(Long memberId);

    void saveBase(Member member);

    String updateBase(Long memberId, BaseModifyRequestDto modifyRequestDto);

    BaseResponseDto diet(Long memberId, BaseDietRequestDto dietRequestDto);
}
