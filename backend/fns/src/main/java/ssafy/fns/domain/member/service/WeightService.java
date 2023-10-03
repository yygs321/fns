package ssafy.fns.domain.member.service;

import java.util.List;
import ssafy.fns.domain.member.controller.dto.WeightRequestDto;
import ssafy.fns.domain.member.controller.dto.WeightTargetRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.entity.Weight;

public interface WeightService {

    void saveWeight(Member member, WeightRequestDto requestDto);

    List<Weight> selectAllWeight(Member member, String date);

    void saveTargetWeight(Member member, WeightTargetRequestDto requestDto);

}
