package ssafy.fns.domain.food.controller.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import ssafy.fns.domain.food.entity.Time;

@Getter
@AllArgsConstructor
public class IntakeInsertRequestDto {
    private Long intake_id;
    private Date date;
    private Long rate;
    private Time intake_time;
}
