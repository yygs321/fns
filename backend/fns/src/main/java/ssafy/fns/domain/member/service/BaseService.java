package ssafy.fns.domain.member.service;

import ssafy.fns.domain.member.controller.dto.BaseDietRequestDto;
import ssafy.fns.domain.member.controller.dto.BaseModifyRequestDto;
import ssafy.fns.domain.member.controller.dto.MemberProfileRequestDto;
import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;
import ssafy.fns.domain.member.entity.Base;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.service.dto.BaseResponseDto;
import ssafy.fns.global.response.BaseResponse;

public interface BaseService {
    String input(Member member);

    String update(Member member, BaseModifyRequestDto modifyRequestDto);

    BaseResponseDto selectOne(Member member);

    BaseResponseDto diet(Member member, BaseDietRequestDto dietRequestDto);
}
