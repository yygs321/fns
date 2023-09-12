package ssafy.fns.domain.exercise.entity;

import java.util.List;
import javax.persistence.Column;
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
import ssafy.fns.global.entity.BaseEntity;

@Entity
@Getter
@NoArgsConstructor
public class Sports extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="sports_id")
    private Long id;

    private String sportsName;

    private Integer time;

    private Integer kcal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @Builder

    public Sports(String sportsName, Integer time, Integer kcal, Exercise exercise) {
        this.sportsName = sportsName;
        this.time = time;
        this.kcal = kcal;
        this.exercise = exercise;
    }
}
