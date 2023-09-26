package ssafy.fns.domain.exercise.entity;

import java.time.LocalDateTime;
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

    private LocalDateTime exerciseDate;

    private Long exerciseTime;

    @Convert(converter = IntegerArrayConverter.class)
    private List<Integer> sportsBookmarkList = new ArrayList<>();

    @Builder
    public Exercise(Sports sports, Member member, LocalDateTime exerciseDate, Long exerciseTime,
            List<Integer> sportsBookmarkList) {
        this.sports = sports;
        this.member = member;
        this.exerciseDate = exerciseDate;
        this.exerciseTime = exerciseTime;
        this.sportsBookmarkList = sportsBookmarkList;
    }

    public void saveSportsBookmarkList(Member member) {
        this.sportsBookmarkList = member.getSportsBookmarkList();
    }
}
