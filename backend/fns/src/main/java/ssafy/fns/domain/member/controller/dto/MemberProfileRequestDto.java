package ssafy.fns.domain.member.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
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
