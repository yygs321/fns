package ssafy.fns.domain.exercise.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.exercise.controller.dto.SaveExerciseRequestDto;
import ssafy.fns.domain.exercise.controller.dto.SaveSportsBookmarkRequestDto;
import ssafy.fns.domain.exercise.controller.dto.SelectExerciseRequestDto;
import ssafy.fns.domain.exercise.entity.Exercise;
import ssafy.fns.domain.exercise.entity.Sports;
import ssafy.fns.domain.exercise.repository.ExerciseRepository;
import ssafy.fns.domain.exercise.repository.SportsRepository;
import ssafy.fns.domain.exercise.service.dto.ExerciseDto;
import ssafy.fns.domain.exercise.service.dto.ExerciseResponseDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.member.repository.MemberRepository;
import ssafy.fns.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final SportsRepository sportsRepository;
    private final MemberRepository memberRepository;
    private final List<Long> sportsIdList = new ArrayList<>(
            Arrays.asList(0L, 1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L, 10L, 11L, 12L));

    @Override
    public void saveExercise(Member member, SaveExerciseRequestDto requestDto) {
        Member findMember = memberRepository.findByEmail(member.getEmail());

        for (int i = 1; i < 13; i++) {
            Long exerciseTime = requestDto.getExerciseTimeList().get(i);
            if (findMember.getSportsBookmarkList().get(i) == 1) {
                Exercise exercise = Exercise.builder()
                        .sports(getSportsById(sportsIdList.get(i)))
                        .member(findMember)
                        .exerciseDate(requestDto.getExerciseDate())
                        .exerciseTime(exerciseTime)
                        .sportsBookmarkList(member.getSportsBookmarkList())
                        .build();

                findMember.addExercise(exercise);

                exerciseRepository.save(exercise);
            }
        }
    }

    @Override
    @Transactional
    public ExerciseResponseDto selectExercise(Member member, SelectExerciseRequestDto requestDto) {

        Member findMember = memberRepository.findByEmail(member.getEmail());

        checkExerciseExisted(member, requestDto);

        List<Integer> sportsBookmarkList = exerciseRepository
                .findFirstByExerciseDateAndMember_Id(requestDto.getExerciseDate(),
                        findMember.getId()).getSportsBookmarkList();

        List<ExerciseDto> exerciseDtoList = new ArrayList<>();

        getExerciseDtoListValue(member, requestDto, sportsBookmarkList, exerciseDtoList);

        ExerciseResponseDto responseDto = ExerciseResponseDto.from(findMember, sportsBookmarkList,
                exerciseDtoList);

        return responseDto;
    }

    @Override
    @Transactional
    public void saveSportsBookmark(Member member, SaveSportsBookmarkRequestDto requestDto) {
        List<Long> sportsBookmarkList = requestDto.getSportsBookmarkList();
        Member findMember = memberRepository.findByEmail(member.getEmail());
        List<Integer> mySportsBookmarkList = findMember.getSportsBookmarkList();
        for (int idx = 1; idx < sportsBookmarkList.size(); idx++) {
            mySportsBookmarkList.set(idx, sportsBookmarkList.get(idx).intValue());
        }

        findMember.updateSportsBookmarkList(mySportsBookmarkList);
    }

    private void getExerciseDtoListValue(Member member, SelectExerciseRequestDto requestDto,
            List<Integer> sportsBookmarkList, List<ExerciseDto> exerciseDtoList) {
        for (int idx = 1; idx < sportsBookmarkList.size(); idx++) {

            if (sportsBookmarkList.get(idx) == 1) {

                Exercise exercise = exerciseRepository.findByExerciseDateAndMember_IdAndSports_Id(
                        requestDto.getExerciseDate(), member.getId(), sportsIdList.get(idx));

                ExerciseDto exerciseDto = ExerciseDto.builder()
                        .sportsId(exercise.getSports().getId())
                        .met(exercise.getSports().getMet())
                        .exerciseTime(exercise.getExerciseTime()).build();

                exerciseDtoList.add(exerciseDto);
            }
        }
    }

    private void checkExerciseExisted(Member member, SelectExerciseRequestDto requestDto) {
        Exercise exercise = exerciseRepository.findFirstByExerciseDateAndMember_Id(
                requestDto.getExerciseDate(), member.getId());
        if (exercise == null) {
            throw new GlobalRuntimeException("해당일자에 운동데이터가 없습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private Sports getSportsById(Long idx) {
        log.info(String.valueOf(idx));
        return sportsRepository.findById(idx).orElseThrow(
                () -> new GlobalRuntimeException("해당 id의 운동 종목이 존재하지 않습니다",
                        HttpStatus.BAD_REQUEST));
    }
}
