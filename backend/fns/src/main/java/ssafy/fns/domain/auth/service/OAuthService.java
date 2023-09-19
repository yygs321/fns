package ssafy.fns.domain.auth.service;

import ssafy.fns.domain.auth.controller.dto.OAuthLoginRequestDto;
import ssafy.fns.domain.auth.service.dto.OAuthLoginResponseDto;
import ssafy.fns.domain.auth.utility.SocialLoginType;

public interface OAuthService {

    OAuthLoginResponseDto login(SocialLoginType socialLoginType, OAuthLoginRequestDto requestDto);
}
