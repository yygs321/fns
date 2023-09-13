package ssafy.fns.domain.food.controller.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.food.entity.Time;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class IntakeRequestDto {

    private Long intake_id;
    private Date date;
    private Long rate;
    private Time intake_time;
}
