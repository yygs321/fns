package ssafy.fns.domain.exercise.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.exercise.service.ExerciseService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/exercise")
@CrossOrigin("*")
@Slf4j
public class ExerciseController {

    private final ExerciseService exerciseService;

}
