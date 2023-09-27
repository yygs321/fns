package ssafy.fns.domain.food.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import ssafy.fns.domain.food.controller.dto.IntakeDeletetRequestDto;
import ssafy.fns.domain.food.controller.dto.IntakeInsertRequestDto;
import ssafy.fns.domain.food.controller.dto.IntakeUpdateRequestDto;
import ssafy.fns.domain.food.service.dto.IntakeOnDateResponseDto;
import ssafy.fns.domain.food.service.dto.IntakeSelectOneResponseDto;
import ssafy.fns.domain.member.entity.Member;

public interface IntakeService {
    List<IntakeSelectOneResponseDto> insert(Member member, List<IntakeInsertRequestDto> requestDtoList);

    String delete(Long memberId, List<IntakeDeletetRequestDto> intakeIdList);

    String update(Long memberId, List<IntakeUpdateRequestDto> requestDtoList);

    IntakeSelectOneResponseDto selectOne(Long memberId, Long intakeId);

    IntakeOnDateResponseDto onDate(Long memberId, String date);

}
