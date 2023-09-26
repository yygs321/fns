package ssafy.fns.domain.exercise.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.exercise.controller.dto.ExerciseRequestDto;
import ssafy.fns.domain.exercise.entity.Exercise;
import ssafy.fns.domain.exercise.entity.Sports;
import ssafy.fns.domain.exercise.repository.ExerciseRepository;
import ssafy.fns.domain.exercise.repository.SportsRepository;
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
    public void saveExercise(Member member, ExerciseRequestDto requestDto) {
        List<Exercise> exerciseList =
                exerciseRepository.findAllByExerciseDate(requestDto.getExerciseDate());
        Member findMember = memberRepository.findByEmail(member.getEmail());

        for (int i = 1; i < 13; i++) {
            Long exerciseTime = requestDto.getExerciseTimeList().get(i);
            Exercise exercise = Exercise.builder()
                    .sports(getSportsById(sportsIdList.get(i)))
                    .member(findMember)
                    .exerciseDate(requestDto.getExerciseDate())
                    .exerciseTime(exerciseTime)
                    .sportsBookmarkList(member.getSportsBookmarkList())
                    .build();

            exerciseRepository.save(exercise);
        }
    }

    private Sports getSportsById(Long idx) {
        log.info(String.valueOf(idx));
        return sportsRepository.findById(idx).orElseThrow(
                () -> new GlobalRuntimeException("해당 id의 운동 종목이 존재하지 않습니다",
                        HttpStatus.BAD_REQUEST));
    }
}
