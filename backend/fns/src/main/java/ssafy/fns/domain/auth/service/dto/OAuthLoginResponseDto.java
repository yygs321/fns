package ssafy.fns.domain.auth.service.dto;

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
public class OAuthLoginResponseDto {

    private Boolean hasProfile;
    private OAuthDetailDto detailDto;
    private TokenDto tokenDto;
    private String socialLoginType;
}
