package ssafy.fns.domain.auth.service;

import ssafy.fns.domain.auth.controller.dto.CheckEmailRequestDto;
import ssafy.fns.domain.auth.controller.dto.RefreshAccessTokenRequestDto;
import ssafy.fns.domain.auth.controller.dto.SendEmailRequestDto;
import ssafy.fns.domain.auth.controller.dto.SignInRequestDto;
import ssafy.fns.domain.auth.service.dto.TokenDto;

public interface AuthService {

    void sendEmail(SendEmailRequestDto requestDto);

    void checkEmail(CheckEmailRequestDto requestDto);

    TokenDto defaultSignIn(SignInRequestDto requestDto);

    String refreshAccessToken(RefreshAccessTokenRequestDto requestDto);
}
