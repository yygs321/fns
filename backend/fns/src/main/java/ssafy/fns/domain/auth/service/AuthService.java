package ssafy.fns.domain.auth.service;

import ssafy.fns.domain.auth.controller.dto.CheckEmailRequestDto;
import ssafy.fns.domain.auth.controller.dto.EmailRequestDto;
import ssafy.fns.domain.auth.controller.dto.RefreshAccessTokenRequestDto;
import ssafy.fns.domain.auth.controller.dto.SignInRequestDto;
import ssafy.fns.domain.auth.service.dto.AuthResponseDto;
import ssafy.fns.domain.auth.service.dto.TokenResponseDto;

public interface AuthService {

    void sendEmail(EmailRequestDto requestDto);

    void checkEmail(CheckEmailRequestDto requestDto);

    AuthResponseDto defaultSignIn(SignInRequestDto requestDto);

    TokenResponseDto refreshAccessToken(RefreshAccessTokenRequestDto requestDto);
}
