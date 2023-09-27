package ssafy.fns.domain.food.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.food.controller.dto.FoodSearchRequestDto;
import ssafy.fns.domain.food.entity.Food;
import ssafy.fns.domain.food.service.FoodServiceImpl;
import ssafy.fns.domain.food.service.dto.FoodSearchResponseDto;
import ssafy.fns.global.response.BaseResponse;
import ssafy.fns.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/foods")
@CrossOrigin("*")
@Slf4j
public class FoodController {
    private final FoodServiceImpl foodService;
    @GetMapping("")
    public ResponseEntity<?> searchFood(@RequestParam(value = "name")String name){
        return JsonResponse.ok("검색 완료", foodService.searchFood(name));
    }
}
