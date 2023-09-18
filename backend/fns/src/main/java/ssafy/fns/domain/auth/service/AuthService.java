package ssafy.fns.domain.auth.service;

import ssafy.fns.domain.auth.controller.dto.CheckEmailRequestDto;
import ssafy.fns.domain.auth.controller.dto.RefreshAccessTokenRequestDto;
import ssafy.fns.domain.auth.controller.dto.SignInRequestDto;
import ssafy.fns.domain.auth.service.dto.TokenDto;
import ssafy.fns.domain.member.controller.dto.EmailRequestDto;

public interface AuthService {

    void sendEmail(EmailRequestDto requestDto);

    void checkEmail(CheckEmailRequestDto requestDto);

    TokenDto defaultSignIn(SignInRequestDto requestDto);

    String refreshAccessToken(RefreshAccessTokenRequestDto requestDto);
}
