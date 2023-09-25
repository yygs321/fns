package ssafy.fns.domain.exercise.service;

import ssafy.fns.domain.exercise.controller.dto.ExerciseRequestDto;
import ssafy.fns.domain.member.entity.Member;

public interface ExerciseService {

    void saveExercise(Member member, ExerciseRequestDto requestDto);
}
