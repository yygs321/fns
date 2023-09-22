package ssafy.fns.domain.member.service;

import ssafy.fns.domain.member.controller.dto.MemberProfileRequestDto;
import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;
import ssafy.fns.domain.member.entity.Member;

public interface MemberService {

    void signUp(SignUpRequestDto requestDto);

    void saveProfile(Member member, MemberProfileRequestDto requestDto);

    //void nicknameDuplication(String nickname);
}
