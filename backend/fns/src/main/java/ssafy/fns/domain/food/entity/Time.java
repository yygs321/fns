package ssafy.fns.domain.food.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Time {

    MORNING("TIME_MORNING"), LUNCH("TIME_LUNCH"), DINNER("TIME_DINNER"), SNACK("TIME_SNACK");

    private final String key;

}
