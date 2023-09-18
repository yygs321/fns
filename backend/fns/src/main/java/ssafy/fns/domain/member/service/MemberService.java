package ssafy.fns.domain.member.service;

import ssafy.fns.domain.member.controller.dto.EmailRequestDto;
import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;

public interface MemberService {

    void signUp(SignUpRequestDto requestDto);

    void emailDuplicationCheck(EmailRequestDto requestDto);

    void nicknameDuplication(String nickname);
}
