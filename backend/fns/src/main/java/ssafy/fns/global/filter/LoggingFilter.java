package ssafy.fns.global.filter;

import javax.servlet.http.HttpServletRequest;
import ssafy.fns.global.util.LoggingUtil;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;

import org.springframework.stereotype.Component;

@Component
public class LoggingFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // 초기화 코드 (필요하다면)
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // 요청의 URL 정보를 가져옵니다.
        // ServletRequest로부터 URL 정보를 직접 가져올 수는 없기 때문에, 더 구체적인 HttpServletRequest 객체로 캐스팅합니다.
        String requestURL = ((HttpServletRequest)request).getRequestURI();

        // 유틸리티를 사용하여 로그를 출력합니다.
        LoggingUtil.printRequestURL(requestURL);

        // 다음 필터 또는 요청 대상으로 요청을 계속 진행합니다.
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // 종료 코드 (필요하다면)
    }
}