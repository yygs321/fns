package ssafy.fns.global.filter;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import ssafy.fns.global.exception.GlobalRuntimeException;
import ssafy.fns.global.security.JwtTokenProvider;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;



    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);

        logger.info("Req URI : " + ((HttpServletRequest) request).getRequestURI());

        String requestURI = ((HttpServletRequest) request).getRequestURI();

        if (token == null) {
            //토큰 정보 없음
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 상태 코드 설정
            httpResponse.getWriter().write("Unauthorized"); // 응답 본문에 메시지 작성
            return;
        }

        if (!jwtTokenProvider.validateAccessToken(token)) {
            //유효성 체크 실패
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 상태 코드 설정
            httpResponse.getWriter().write("Invalid"); // 응답 본문에 메시지 작성
            return;
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(token);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        chain.doFilter(request, response);

    }
}

