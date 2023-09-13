package ssafy.fns.domain.auth.service;

import ssafy.fns.domain.auth.controller.dto.SignInRequestDto;
import ssafy.fns.domain.auth.service.dto.TokenDto;

public interface AuthService {

    TokenDto defaultSignIn(SignInRequestDto requestDto);
}
