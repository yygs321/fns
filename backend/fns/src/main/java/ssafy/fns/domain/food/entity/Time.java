package ssafy.fns.domain.food.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Time {

    MORNING("MORNING"), LUNCH("LUNCH"), DINNER("DINNER"), ETC("ETC");

    private final String key;

}
