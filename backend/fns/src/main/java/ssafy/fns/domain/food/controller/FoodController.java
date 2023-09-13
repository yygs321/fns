package ssafy.fns.domain.food.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.food.service.FoodService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/food")
@CrossOrigin("*")
@Slf4j
public class FoodController {

    private final FoodService foodService;

}
