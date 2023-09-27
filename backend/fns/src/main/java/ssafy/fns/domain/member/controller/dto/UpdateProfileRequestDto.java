package ssafy.fns.domain.member.controller.dto;

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
public class UpdateProfileRequestDto {

    private String nickname;
    private Double height;
    private Double weight;
    private Long age;
    private Boolean isPublished;
}
