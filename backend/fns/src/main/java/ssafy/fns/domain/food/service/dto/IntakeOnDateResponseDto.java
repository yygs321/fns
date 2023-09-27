package ssafy.fns.domain.food.service.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.food.entity.Intake;

/*
 * 메인페이지에 내가 오늘 먹은 칼로리, 탄수화물, 단백질, 지방 양 반환
 * */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IntakeOnDateResponseDto {
    private Double kcal;

    private Double carbs;

    private Double protein;

    private Double fat;

    public void plus(Intake intake){
        this.kcal += multi(intake.getFood().getKcal(), intake.getRate());
        this.carbs += multi(intake.getFood().getCarbs(), intake.getRate());
        this.protein += multi(intake.getFood().getProtein(), intake.getRate());
        this.fat += multi(intake.getFood().getFat(), intake.getRate());
    }

    public static Double multi(Double nutrition, Double rate){
        Double temp = nutrition*rate;
        return (double) Math.round(temp*10)/10.0;
    }
}
