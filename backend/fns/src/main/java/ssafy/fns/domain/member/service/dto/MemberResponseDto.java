package ssafy.fns.domain.member.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.member.controller.dto.MemberProfileRequestDto;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {

    private String nickname;
    private Integer age;
    private Long height;
    private Long weight;
    private String gender;
    private Boolean isPublished;

    public static MemberResponseDto from(MemberProfileRequestDto requestDto) {
        return MemberResponseDto.builder()
                .nickname(requestDto.getNickname())
                .age(requestDto.getAge())
                .height(requestDto.getHeight())
                .weight(requestDto.getWeight())
                .gender(requestDto.getGender())
                .isPublished(requestDto.getIsPublished())
                .build();
    }
}
