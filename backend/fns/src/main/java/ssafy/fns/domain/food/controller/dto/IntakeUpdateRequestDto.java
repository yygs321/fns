package ssafy.fns.domain.food.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
* 먹은 양 수정
* */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IntakeUpdateRequestDto {
    private Long intakeId;
    private Double rate;
}
