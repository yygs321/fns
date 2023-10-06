package ssafy.fns.global.util;

import java.time.LocalDate;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class LocalDateConverter implements Converter<String, LocalDate> {

    @Override
    public LocalDate convert(String source) {
        // 문자열을 LocalDate로 변환
        return LocalDate.parse(source);
    }
}

