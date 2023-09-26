package ssafy.fns.domain.member.service;

import ssafy.fns.domain.auth.service.dto.TokenDto;
import ssafy.fns.domain.member.controller.dto.EmailDuplicationRequestDto;
import ssafy.fns.domain.member.controller.dto.MemberProfileRequestDto;
import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;
import ssafy.fns.domain.member.entity.Member;

public interface MemberService {

    void signUp(SignUpRequestDto requestDto);

    void saveProfile(Member member, MemberProfileRequestDto requestDto);

    void checkNicknameDuplicated(EmailDuplicationRequestDto requestDto);

    void logout(Member member, TokenDto tokenDto);

    void deleteMember(Member member, TokenDto tokenDto);

    Member getMemberById(Long id);
}
