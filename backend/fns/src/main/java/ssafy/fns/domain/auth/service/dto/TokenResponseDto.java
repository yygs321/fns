package ssafy.fns.domain.auth.service.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ssafy.fns.domain.auth.vo.Token;

@NoArgsConstructor
@Getter
@Setter
public class TokenResponseDto {

    private String accessToken;
    private String refreshToken;
    private Long expirationTime;

    @Builder
    public TokenResponseDto(String accessToken, String refreshToken, Long expirationTime) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expirationTime = expirationTime;
    }

    public static TokenResponseDto from(Token token, Long expirationTime) {
        return TokenResponseDto.builder()
                .accessToken(token.getAccessToken())
                .refreshToken(token.getRefreshToken())
                .expirationTime(expirationTime)
                .build();
    }

}
