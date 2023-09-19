package ssafy.fns.domain.food.service.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.food.entity.Time;

/*
 * 식단 입력 페이지에서 내가 오늘 먹은 음식 반환
 * */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IntakeForDietResponseDto {
    private String name;

    private Time intake_time;

    private Double kcal;
}
