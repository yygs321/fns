package ssafy.fns.domain.food.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.food.service.IntakeService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/invake")
@CrossOrigin("*")
@Slf4j
public class IntakeController {
    private final IntakeService invakeService;

}
