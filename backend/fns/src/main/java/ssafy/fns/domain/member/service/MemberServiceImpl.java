package ssafy.fns.domain.member.service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.auth.entity.MailHistory;
import ssafy.fns.domain.auth.repository.MailHistoryRepository;
import ssafy.fns.domain.auth.repository.RefreshTokenRepository;
import ssafy.fns.domain.auth.service.dto.TokenDto;
import ssafy.fns.domain.member.controller.dto.EmailDuplicationRequestDto;
import ssafy.fns.domain.member.controller.dto.MemberProfileRequestDto;
import ssafy.fns.domain.member.controller.dto.SignUpRequestDto;
import ssafy.fns.domain.member.controller.dto.UpdatePasswordRequestDto;
import ssafy.fns.domain.member.controller.dto.UpdateProfileRequestDto;
import ssafy.fns.domain.member.controller.dto.WeightRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.entity.Provider;
import ssafy.fns.domain.member.entity.WeightHistory;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.domain.member.repository.WeightHistoryRepository;
import ssafy.fns.domain.member.service.dto.MemberResponseDto;
import ssafy.fns.global.config.RedisUtil;
import ssafy.fns.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailHistoryRepository mailHistoryRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final RedisUtil redisUtil;
    private final WeightHistoryRepository weightHistoryRepository;

    @Override
    @Transactional
    public void signUp(SignUpRequestDto requestDto) {
        checkPassword(requestDto.getPassword(), requestDto.getPassword2());

        checkMailAuthed(requestDto.getEmail());

        Member findMember = memberRepository.findByEmail(requestDto.getEmail());
        if (findMember != null) {
            findMember.add();
            findMember.updatePassword(passwordEncoder.encode(requestDto.getPassword()));
        } else {
            Member member = Member.builder()
                    .email(requestDto.getEmail())
                    .password(passwordEncoder.encode(requestDto.getPassword()))
                    .provider(Provider.valueOf(requestDto.getProvider()))
                    .build();

            memberRepository.save(member);
        }
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
        //몸무게 기록
        WeightHistory weight = WeightHistory.builder()
                .memberId(member.getId())
                .weight(requestDto.getWeight())
                .build();
        weightHistoryRepository.save(weight);
        findMember.saveProfile(requestDto);
    }

    @Override
    @Transactional
    public void checkNicknameDuplicated(EmailDuplicationRequestDto requestDto) {
        Member findMember = memberRepository.findByNickname(requestDto.getNickname());

        if (findMember != null) {
            throw new GlobalRuntimeException("이미 존재하는 닉네임 입니다.", HttpStatus.CONFLICT);
        }
    }

    @Override
    @Transactional
    public void logout(Member member, TokenDto tokenDto) {
        Long expirationTime = tokenDto.getExpirationTime();
        refreshTokenRepository.deleteByEmail(member.getEmail());
        redisUtil.setBlackList(tokenDto.getAccessToken(), "accessToken", expirationTime);
    }

    @Override
    @Transactional
    public void deleteMember(Member member, TokenDto tokenDto) {
        Member findMember = getMemberById(member.getId());
        logout(findMember, tokenDto);
        removeMailHistory(findMember);
        findMember.delete();
    }

    @Override
    @Transactional
    public MemberResponseDto selectMember(Member member) {
        Member findMember = getMemberById(member.getId());

        return MemberResponseDto.from(findMember);
    }

    @Override
    @Transactional
    public void updateProfile(Member member, UpdateProfileRequestDto requestDto) {
        Member findMember = getMemberById(member.getId());
        //몸무게 기록
        WeightHistory weight = WeightHistory.builder()
                            .memberId(member.getId())
                            .weight(requestDto.getWeight())
                            .build();
        weightHistoryRepository.save(weight);
        findMember.updateProfile(requestDto);
    }

    @Override
    @Transactional
    public void updatePassword(Member member, UpdatePasswordRequestDto requestDto) {
        Member findMember = memberRepository.findByEmail(member.getEmail());
        log.info(findMember.getId().toString());
        if (!passwordEncoder.matches(requestDto.getPrevPassword(),
                findMember.getPassword())) {
            throw new GlobalRuntimeException("비밀번호가 틀립니다.", HttpStatus.BAD_REQUEST);
        }
        checkPassword(requestDto.getPassword(), requestDto.getPassword2());
        log.info(findMember.getPassword());
        log.info(requestDto.getPassword());
        findMember.updatePassword(passwordEncoder.encode(requestDto.getPassword()));
        log.info(findMember.getPassword());

    }

    @Override
    @Transactional
    public Member getMemberById(Long id) {
        return memberRepository.findById(id).orElseThrow(
                () -> new GlobalRuntimeException("해당 ID의 유저가 없습니다", HttpStatus.BAD_REQUEST));
    }

    private void removeMailHistory(Member findMember) {
        MailHistory mailHistory = mailHistoryRepository.findTop1ByEmailAndIsAuthedOrderByIdDesc(
                findMember.getEmail(), true);
        mailHistoryRepository.deleteById(mailHistory.getId());
    }

    private void checkPassword(String password, String password2) {
        if (!password.equals(password2)) {
            throw new GlobalRuntimeException("Password 확인이 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        if (!Pattern.matches("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,16}$", password)) {
            throw new GlobalRuntimeException("Password 형식이 잘못되었습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public WeightRequestDto addWeight(Member member, WeightRequestDto requestDto) {
        WeightHistory weight = WeightHistory.builder()
                .memberId(1L)
                .weight(requestDto.getWeight())
                .build();
        weightHistoryRepository.save(weight);
        return requestDto;
    }

    @Override
    public List<WeightHistory> selectAllWeight(Member member, String date) {
        String startyear = date.substring(0,4);
        String startMonth = date.substring(5,7);
        int month = Integer.parseInt(startMonth)+1;
        String year="";
        if(month > 12){
            month = 1;
            int  tempYear = Integer.parseInt(startyear)+1;
            year = String.valueOf(tempYear)+"-";
        }else {
            year = startyear+"-";
        }
        String endMonth = String.valueOf(month);
        String startDate = year+startMonth+"-01";
        String endDate = year+endMonth+"-01";

        System.out.println("시작 : "+startDate);
        System.out.println("끝 : "+endDate);
        List<WeightHistory> optionalList = weightHistoryRepository.findAllByDateAndMemberId(startDate, endDate, 1L);
        if (optionalList.isEmpty()) throw new GlobalRuntimeException("몸무게 기록이 없습니다", HttpStatus.BAD_REQUEST);
        return optionalList;
    }
}


