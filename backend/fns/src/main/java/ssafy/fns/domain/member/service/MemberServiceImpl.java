package ssafy.fns.domain.member.service;

import java.util.regex.Pattern;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.auth.entity.MailHistory;
import ssafy.fns.domain.auth.repository.MailHistoryRepository;
import ssafy.fns.domain.auth.service.dto.TokenDto;
import ssafy.fns.domain.member.controller.dto.MemberProfileRequestDto;
import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.entity.Provider;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailHistoryRepository mailHistoryRepository;

    @Override
    @Transactional
    public void signUp(SignUpRequestDto requestDto) {
        checkPassword(requestDto.getPassword(), requestDto.getPassword2());

        checkMailAuthed(requestDto.getEmail());

        Member member = Member.builder()
                .email(requestDto.getEmail())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .provider(Provider.valueOf(requestDto.getProvider()))
                .build();

        memberRepository.save(member);
    }

    private void checkMailAuthed(String email) {
        MailHistory mailHistory = mailHistoryRepository.findByEmail(email);
        if (mailHistory == null) {
            throw new GlobalRuntimeException("메일 전송을 완료해주세요", HttpStatus.NOT_FOUND);
        }
        if (!mailHistory.isAuthed()) {
            throw new GlobalRuntimeException("메일 인증을 완료해주세요", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Override
    @Transactional
    public void saveProfile(Member member, MemberProfileRequestDto requestDto) {
        Member findMember = memberRepository.findByEmail(member.getEmail());
        findMember.saveProfile(requestDto);
    }

    @Override
    public void checkNicknameDuplicated(MemberProfileRequestDto requestDto) {

    }

    @Override
    public void logout(Member member, TokenDto tokenDto) {

    }

    @Override
    public void deleteMember(Member member, TokenDto tokenDto) {

    }


    private void checkPassword(String password, String password2) {
        if (!password.equals(password2)) {
            throw new GlobalRuntimeException("Password 확인이 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        if (!Pattern.matches("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,16}$", password)) {
            throw new GlobalRuntimeException("Password 형식이 잘못되었습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}


