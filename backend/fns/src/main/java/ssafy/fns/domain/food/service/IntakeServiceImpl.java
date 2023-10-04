package ssafy.fns.domain.food.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.food.controller.dto.IntakeDeletetRequestDto;
import ssafy.fns.domain.food.controller.dto.IntakeInsertRequestDto;
import ssafy.fns.domain.food.controller.dto.IntakeOnDateRequestDto;
import ssafy.fns.domain.food.controller.dto.IntakeUpdateRequestDto;
import ssafy.fns.domain.food.entity.Food;
import ssafy.fns.domain.food.entity.Intake;
import ssafy.fns.domain.food.repository.FoodRepository;
import ssafy.fns.domain.food.repository.IntakeRepository;
import ssafy.fns.domain.food.service.dto.IntakeAllOnDateResponseDto;
import ssafy.fns.domain.food.service.dto.IntakeOnDateResponseDto;
import ssafy.fns.domain.food.service.dto.IntakeSelectOneResponseDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
@Slf4j
public class IntakeServiceImpl implements IntakeService {
    private final IntakeRepository intakeRepository;
    private final FoodRepository foodRepository;
    private final MemberRepository memberRepository;
    @Override
    public List<IntakeSelectOneResponseDto> insert(Member member, List<IntakeInsertRequestDto>  requestDtoList) {
        List<IntakeSelectOneResponseDto> responseDtoList = new ArrayList<>();
        for(IntakeInsertRequestDto requestDto : requestDtoList){
            Optional<Food> optionalFood = foodRepository.findById(requestDto.getFoodId());

            if(!optionalFood.isPresent()) throw new GlobalRuntimeException("음식 정보를 다시 확인해주세요.", HttpStatus.BAD_REQUEST);

            Food food = optionalFood.get();

            Optional<Member> member1 = memberRepository.findById(1L);

            Intake intake = new Intake().builder()
                    .intakeTime(requestDto.getIntakeTime())
                    .date(requestDto.getDate())
                    .rate(requestDto.getRate())
                    .food(food)
                    .member(member1.get())
                    .build();
            intakeRepository.save(intake);
            responseDtoList.add(new IntakeSelectOneResponseDto().from(intake));
        }
        return responseDtoList;
    }

    @Override
    public String delete(Long memberId, List<IntakeDeletetRequestDto> intakeIdList) {
        for(IntakeDeletetRequestDto requestDto : intakeIdList){
            Optional<Intake> optionalIntake = intakeRepository.findById(requestDto.getIntakeId());
            if (!optionalIntake.isPresent()) throw new GlobalRuntimeException("intake id 확인 필요", HttpStatus.BAD_REQUEST);

            Intake intake = optionalIntake.get();
            if(intake.getMember().getId() != memberId) throw new GlobalRuntimeException("본인의 섭취 내역이 아닙니다.", HttpStatus.BAD_REQUEST);

            intakeRepository.delete(intake);
        }
        return "삭제 완료";
    }

    @Override
    public String update(Long memberId, List<IntakeUpdateRequestDto> requestDtoList) {
        for(IntakeUpdateRequestDto requestDto : requestDtoList){
            Optional<Intake> optionalIntake = intakeRepository.findById(requestDto.getIntakeId());
            if (!optionalIntake.isPresent()) throw new GlobalRuntimeException("intake id 확인 필요", HttpStatus.BAD_REQUEST);

            Intake intake = optionalIntake.get();
            if(intake.getMember().getId() != memberId) throw new GlobalRuntimeException("본인의 섭취 내역이 아닙니다.", HttpStatus.BAD_REQUEST);

            intake.updateRate(requestDto.getRate());
            intakeRepository.save(intake);
        }
        return "수정 완료";
    }

    @Override
    public IntakeSelectOneResponseDto selectOne(Long memberId, Long intakeId) {
        Optional<Intake> optionalIntake = intakeRepository.findById(intakeId);
        if (!optionalIntake.isPresent()) throw new GlobalRuntimeException("intake id 확인 필요", HttpStatus.BAD_REQUEST);

        Intake intake = optionalIntake.get();
        if(intake.getMember().getId() != memberId) throw new GlobalRuntimeException("본인의 섭취 내역이 아닙니다.", HttpStatus.BAD_REQUEST);

        return IntakeSelectOneResponseDto.from(intake);
    }

    @Override
    public IntakeOnDateResponseDto nutrientOnDate(Long memberId, String date) {
        List<Optional<Intake>> optionalIntakes = intakeRepository.findAllByDateAndMemberId(date, memberId);
        if(optionalIntakes.isEmpty()) {
            return new IntakeOnDateResponseDto((double) 0, (double) 0, (double) 0, (double) 0);
        }

        IntakeOnDateResponseDto intake = new IntakeOnDateResponseDto((double) 0, (double) 0,
                (double) 0, (double) 0);
        for(Optional<Intake> optionalIntake : optionalIntakes){
            intake.plus(optionalIntake.get());
        }
        return intake;
    }

    @Override
    public List<IntakeAllOnDateResponseDto> allOnDate(Long memberId, String date) {
        List<Optional<Intake>> optionalIntakes = intakeRepository.findAllByDateAndMemberId(date, memberId);
        if(optionalIntakes.isEmpty()) {
            List<IntakeAllOnDateResponseDto> nullList = new ArrayList<>();
            return nullList;
        }

        List<IntakeAllOnDateResponseDto> intakeList = new ArrayList<>();
        for(Optional<Intake> optionalIntake : optionalIntakes){
            intakeList.add(new IntakeAllOnDateResponseDto(optionalIntake.get()));
        }
        return intakeList;
    }
}
