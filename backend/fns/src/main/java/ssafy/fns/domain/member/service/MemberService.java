package ssafy.fns.domain.member.service;

import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;

public interface MemberService {

    void signUp(SignUpRequestDto requestDto);

    void emailDuplicationCheck(String email);

    void nicknameDuplication(String nickname);
}
