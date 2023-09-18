package ssafy.fns.domain.member.service;

import java.util.regex.Pattern;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.member.controller.dto.EmailRequestDto;
import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.entity.Provider;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void signUp(SignUpRequestDto requestDto) {
        checkValication(requestDto);

        Member member = Member.builder()
                .email(requestDto.getEmail())
                .password(requestDto.getPassword())
                .provider(Provider.valueOf(requestDto.getProvider()))
                .build();

        memberRepository.save(member);
    }

    @Override
    @Transactional
    public void emailDuplicationCheck(EmailRequestDto requestDto) {
        checkEmailRegexp(requestDto.getEmail());
        Member member = memberRepository.findByEmail(requestDto.getEmail());

        if (member != null) {
            throw new GlobalRuntimeException("이미 존재하는 이메일입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    @Transactional
    public void nicknameDuplication(String nickname) {
        Member member = memberRepository.findByNickname(nickname);

        if (member != null) {
            throw new GlobalRuntimeException("이미 존재하는 닉네임입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkValication(SignUpRequestDto requestDto) {
        String password = requestDto.getPassword();
        String password2 = requestDto.getPassword2();

        checkPasswordMatch(password, password2);
        checkPasswordRegexp(password);
    }

    private void checkEmailRegexp(String email) {
        if (!Pattern.matches("\\w+@\\w+\\.\\w+(\\.\\w+)?", email)) {
            throw new GlobalRuntimeException("Email 형식이 잘못되었습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkPasswordMatch(String password, String password2) {
        if (!password.equals(password2)) {
            throw new GlobalRuntimeException("Password 확인이 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkPasswordRegexp(String password) {
        if (!Pattern.matches("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,15}$", password)) {
            throw new GlobalRuntimeException("Password 형식이 잘못되었습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}


