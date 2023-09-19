package ssafy.fns.domain.food.controller.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ssafy.fns.domain.food.entity.Time;

/*
* 먹은 거 입력
* */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IntakeInsertRequestDto {
    private Long foodId;
    private Date date;
    private Double rate;
    private Time intakeTime;
}
