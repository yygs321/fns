package ssafy.fns.domain.baseNutrient.controller.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SelectBaseRequestDto {

    private LocalDate baseNutrientDate;
}
