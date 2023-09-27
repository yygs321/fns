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
public class MemberProfileRequestDto {

    private String nickname;
    private Long age;
    private Double height;
    private Double weight;
    private String gender;
    private Boolean isPublished;
}
