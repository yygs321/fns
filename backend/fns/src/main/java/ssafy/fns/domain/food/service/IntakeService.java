package ssafy.fns.domain.food.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import ssafy.fns.domain.food.controller.dto.IntakeInsertRequestDto;
import ssafy.fns.domain.food.service.dto.IntakeOnDateResponseDto;
import ssafy.fns.domain.food.service.dto.IntakeSelectOneResponseDto;
import ssafy.fns.domain.member.entity.Member;

public interface IntakeService {
    IntakeSelectOneResponseDto insert(Member member, IntakeInsertRequestDto requestDto);

    String delete(Long memberId, Long intakeId);

    IntakeSelectOneResponseDto selectOne(Long memberId, Long intakeId);

    IntakeOnDateResponseDto onDate(Long memberId, String date);
}
