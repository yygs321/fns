package ssafy.fns.domain.food.controller.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
* 달력용
* */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IntakeSelectOneRequestDto {
    private Date date;
}
