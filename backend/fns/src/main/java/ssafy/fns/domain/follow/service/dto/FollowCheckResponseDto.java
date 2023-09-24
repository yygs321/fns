package ssafy.fns.domain.follow.service.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FollowCheckResponseDto {
    private Long followId;

    private Long memberId;

    private Boolean isValid;
}
