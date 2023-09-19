package ssafy.fns.domain.food.service.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
/*
 * 메인페이지에 내가 오늘 먹은 칼로리, 탄수화물, 단백질, 지방 양 반환
 * */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IntakeForMainResponseDto {
    private Double kcal;

    private Double carbs;

    private Double protein;

    private Double fat;
}
