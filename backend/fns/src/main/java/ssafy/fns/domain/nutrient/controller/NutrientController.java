package ssafy.fns.domain.nutrient.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.nutrient.service.NutrientService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/nutrient")
@CrossOrigin("*")
@Slf4j
public class NutrientController {

    private final NutrientService nutrientService;

}
