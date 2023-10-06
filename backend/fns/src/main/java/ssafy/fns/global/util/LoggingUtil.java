package ssafy.fns.global.util;

import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoggingUtil {

    public static void printRequestURL(String url){
        log.info("Request URL : " + url);
        log.info("Request Time : " + LocalDateTime.now());
    }

}
