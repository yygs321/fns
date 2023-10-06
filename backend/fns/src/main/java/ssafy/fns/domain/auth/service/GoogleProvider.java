package ssafy.fns.domain.auth.service;

import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.fns.domain.auth.service.dto.OAuthDetailDto;

@Service
@RequiredArgsConstructor
public class GoogleProvider implements OAuthProvider {

    @Override
    @Transactional
    public String getToken(String code) {
        return null;
    }

    @Override
    @Transactional
    public String buildAccessTokenUri(String code) {
        return null;
    }

    @Override
    @Transactional
    public OAuthDetailDto getOAuthDetail(String token) {
        return null;
    }
}
