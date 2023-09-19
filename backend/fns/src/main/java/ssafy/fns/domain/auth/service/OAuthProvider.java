package ssafy.fns.domain.auth.service;

import ssafy.fns.domain.auth.service.dto.OAuthDetailDto;

public interface OAuthProvider {

    String getToken(String code);

    String buildAccessTokenUri(String code);

    OAuthDetailDto getOAuthDetail(String token);
}
