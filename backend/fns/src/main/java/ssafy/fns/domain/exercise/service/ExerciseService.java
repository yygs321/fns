package ssafy.fns.domain.exercise.service;

import ssafy.fns.domain.exercise.controller.dto.SaveExerciseRequestDto;
import ssafy.fns.domain.exercise.controller.dto.SaveSportsBookmarkRequestDto;
import ssafy.fns.domain.exercise.controller.dto.SelectExerciseRequestDto;
import ssafy.fns.domain.exercise.service.dto.ExerciseResponseDto;
import ssafy.fns.domain.member.entity.Member;

public interface ExerciseService {

    void saveExercise(Member member, SaveExerciseRequestDto requestDto);

    ExerciseResponseDto selectExercise(Member member, SelectExerciseRequestDto requestDto);

    void saveSportsBookmark(Member member, SaveSportsBookmarkRequestDto requestDto);
}
