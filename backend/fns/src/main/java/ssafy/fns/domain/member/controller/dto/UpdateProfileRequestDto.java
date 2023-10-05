package ssafy.fns.domain.member.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
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
