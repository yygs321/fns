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
public class MemberListResponseDto {
    private Long id;
    private String nickname;
    private Boolean already;
    private Long age;
    private Double height;
    private Double weight;
    private String gender;
    private Boolean isPublished;

    public static MemberListResponseDto from(Member member, Boolean already) {
        return MemberListResponseDto.builder()
                .id(member.getId())
                .already(already)
                .nickname(member.getNickname())
                .age(member.getAge())
                .height(member.getHeight())
                .weight(member.getWeight())
                .gender(member.getGender())
                .isPublished(member.getIsPublished())
                .build();
    }
}
