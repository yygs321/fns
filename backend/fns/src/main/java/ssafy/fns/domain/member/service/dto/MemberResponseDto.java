package ssafy.fns.domain.member.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.member.entity.Member;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {

    private String nickname;
    private Long age;
    private Double height;
    private Double weight;
    private String gender;
    private Boolean isPublished;

    public static MemberResponseDto from(Member member) {
        return MemberResponseDto.builder()
                .nickname(member.getNickname())
                .age(member.getAge())
                .height(member.getHeight())
                .weight(member.getWeightList().get((member.getWeightList().size()) - 1).getWeight())
                .gender(member.getGender())
                .isPublished(member.getIsPublished())
                .build();
    }
}
