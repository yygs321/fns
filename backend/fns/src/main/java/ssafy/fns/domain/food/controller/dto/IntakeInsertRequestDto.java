package ssafy.fns.domain.food.controller.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private LocalDate date;
    private Time intakeTime;
    private Double rate;
}
