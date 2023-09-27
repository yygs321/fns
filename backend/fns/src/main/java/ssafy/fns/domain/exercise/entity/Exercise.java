package ssafy.fns.domain.exercise.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.global.entity.BaseEntity;
import ssafy.fns.global.util.IntegerArrayConverter;

@Entity
@NoArgsConstructor
@Getter
public class Exercise extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sports_id")
    private Sports sports;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @DateTimeFormat(fallbackPatterns = "yyyy-MM-dd")
    private LocalDate exerciseDate;

    private Long exerciseTime;

    @Convert(converter = IntegerArrayConverter.class)
    private List<Integer> sportsBookmarkList = new ArrayList<>();


    @Builder
    public Exercise(Sports sports, Member member, LocalDate exerciseDate, Long exerciseTime,
            List<Integer> sportsBookmarkList) {
        this.sports = sports;
        this.member = member;
        this.exerciseDate = exerciseDate;
        this.exerciseTime = exerciseTime;
        this.sportsBookmarkList = sportsBookmarkList;
    }

}
