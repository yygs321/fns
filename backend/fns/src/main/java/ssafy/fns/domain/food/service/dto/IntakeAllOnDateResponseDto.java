package ssafy.fns.domain.food.service.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.food.entity.Food;
import ssafy.fns.domain.food.entity.Intake;
import ssafy.fns.domain.food.entity.Time;

/*
 * 내가 오늘 입력한 식단 이력
 * */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IntakeAllOnDateResponseDto {

    private Long intakeId;

    private Time intakeTime;

    private Double rate;

    private Long foodId;

    private String foodName;

    private Double kcal;

    private Double carbs;

    private Double protein;

    private Double fat;

    public IntakeAllOnDateResponseDto(Intake intake){
        this.intakeId = intake.getId();
        this.intakeTime = intake.getIntakeTime();
        this.rate = intake.getRate();
        this.foodId = intake.getFood().getFoodId();
        this.foodName = intake.getFood().getName();
        this.kcal = multi(intake.getFood().getKcal(), intake.getRate());
        this.carbs = multi(intake.getFood().getCarbs(), intake.getRate());
        this.protein = multi(intake.getFood().getProtein(), intake.getRate());
        this.fat = multi(intake.getFood().getFat(), intake.getRate());
    }

    public static Double multi(Double nutrition, Double rate){
        Double temp = nutrition*rate;
        return (double) Math.round(temp*10)/10.0;
    }
}
