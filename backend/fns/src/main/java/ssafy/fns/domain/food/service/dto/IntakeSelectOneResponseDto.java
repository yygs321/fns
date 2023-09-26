package ssafy.fns.domain.food.service.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.food.entity.Intake;
import ssafy.fns.domain.food.entity.Time;

/*
* 캘린더에서 사용자가 원하는 날짜에 먹은 영양 정보 반환용
* */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IntakeSelectOneResponseDto {
    private Long intakeId;

    private String foodName;

    private LocalDate date;

    private Time intakeTime;

    private Double volume;

    private Double kcal;

    private Double carbs;

    private Double protein;

    private Double fat;

    private Double pollination;

    private Double sugar;

    private Double dietaryFiber;

    private Double calcium;

    private Double potassium;

    private Double iron;

    private Double phosphorus;

    private Double sodium;

    private Double vitaminA;

    private Double vitaminC;

    private Double vitaminD;

    private Double cholesterol;

    private Double acid;

    private Double transFat;

    public static IntakeSelectOneResponseDto from(Intake intake) {
        return IntakeSelectOneResponseDto.builder()
                .intakeId(intake.getId())
                .foodName(intake.getFood().getName())
                .date(intake.getDate())
                .intakeTime(intake.getIntakeTime())
                .volume(intake.getRate())
                .kcal(multi(intake.getFood().getKcal(), intake.getRate()))
                .carbs(multi(intake.getFood().getCarbs(), intake.getRate()))
                .protein(multi(intake.getFood().getProtein(), intake.getRate()))
                .fat(multi(intake.getFood().getFat(), intake.getRate()))
                .pollination(multi(intake.getFood().getPollination(), intake.getRate()))
                .sugar(multi(intake.getFood().getSugar(), intake.getRate()))
                .dietaryFiber(multi(intake.getFood().getDietaryFiber(), intake.getRate()))
                .calcium(multi(intake.getFood().getCalcium(), intake.getRate()))
                .potassium(multi(intake.getFood().getPotassium(), intake.getRate()))
                .iron(multi(intake.getFood().getIron(), intake.getRate()))
                .phosphorus(multi(intake.getFood().getPhosphorus(), intake.getRate()))
                .sodium(multi(intake.getFood().getSodium(), intake.getRate()))
                .vitaminA(multi(intake.getFood().getVitaminA(), intake.getRate()))
                .vitaminC(multi(intake.getFood().getVitaminC(), intake.getRate()))
                .vitaminD(multi(intake.getFood().getVitaminD(), intake.getRate()))
                .cholesterol(multi(intake.getFood().getCholesterol(), intake.getRate()))
                .acid(multi(intake.getFood().getAcid(), intake.getRate()))
                .transFat(multi(intake.getFood().getTransFat(), intake.getRate()))
                .build();
    }

    public static Double multi(Double nutrition, Double rate){
        Double temp = nutrition*rate;
        return (double) Math.round(temp*10)/10.0;
    }
}
