package ssafy.fns.domain.exercise.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.exercise.controller.dto.ExerciseRequestDto;
import ssafy.fns.domain.member.entity.Member;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExerciseServiceImpl implements ExerciseService {

    @Override
    public void saveExercise(Member member, ExerciseRequestDto requestDto) {
        
    }
}
