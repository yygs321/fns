package ssafy.fns.domain.auth.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class checkEmailRequestDto {

    private String email;
    private String code;
}
