package ssafy.fns.domain.follow.service.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.food.entity.Intake;
import ssafy.fns.domain.member.entity.Member;

@Getter
@NoArgsConstructor
@Builder
public class FollowResponseDto {
    private Long memberId;

    private String nickName;

    private Double kcal;

    private Double carbs;

    private Double protein;

    private Double fat;

    private Intake intake;

    @Builder
    public FollowResponseDto(Long memberId, String nickName, Double kcal, Double carbs,
            Double protein,
            Double fat, Intake intake) {
        this.memberId = memberId;
        this.nickName = nickName;
        this.kcal = kcal;
        this.carbs = carbs;
        this.protein = protein;
        this.fat = fat;
        this.intake = intake;
    }
}
