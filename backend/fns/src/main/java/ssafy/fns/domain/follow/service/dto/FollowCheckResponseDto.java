package ssafy.fns.domain.follow.service.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.food.entity.Intake;

@Getter
@NoArgsConstructor
@Builder
public class FollowCheckResponseDto {
    private Long followId;

    private Long memberId;

    private Boolean isValid;

    @Builder
    public FollowCheckResponseDto(Long followId, Long memberId, Boolean isValid) {
        this.followId = followId;
        this.memberId = memberId;
        this.isValid = isValid;
    }
}
