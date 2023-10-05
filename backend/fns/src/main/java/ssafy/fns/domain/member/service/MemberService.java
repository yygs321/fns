package ssafy.fns.domain.member.service;

import org.springframework.web.multipart.MultipartFile;
import ssafy.fns.domain.auth.service.dto.TokenDto;
import ssafy.fns.domain.member.controller.dto.EmailDuplicationRequestDto;
import ssafy.fns.domain.member.controller.dto.MemberProfileRequestDto;
import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;
import ssafy.fns.domain.member.controller.dto.UpdatePasswordRequestDto;
import ssafy.fns.domain.member.controller.dto.UpdateProfileRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.service.dto.CalendarResponseDto;
import ssafy.fns.domain.member.service.dto.MemberResponseDto;

public interface MemberService {

    void signUp(SignUpRequestDto requestDto);

    void saveProfile(Member member, MemberProfileRequestDto requestDto);

    void checkNicknameDuplicated(EmailDuplicationRequestDto requestDto);

    void logout(Member member, TokenDto tokenDto);

    void deleteMember(Member member, TokenDto tokenDto);

    Member getMemberById(Long id);

    MemberResponseDto selectMember(Member member);

    void updateProfile(Member member, UpdateProfileRequestDto requestDto);

    void updatePassword(Member member, UpdatePasswordRequestDto requestDto);


    void uploadProfileImage(Member member, MultipartFile file);

    CalendarResponseDto selectCalendarData(Member member, String calendarDate);
}
