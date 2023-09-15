package ssafy.fns.domain.food.entity;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
import ssafy.fns.global.entity.BaseEntity;

@Entity
@NoArgsConstructor
@Getter
public class Intake extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "intake_id")
    private Long id;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;

    @Enumerated(EnumType.STRING)
    private Time intake_time;

    private Long rate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_id")
    private Food food;

    @Builder

    public Intake(Date date, Time intake_time, Long rate) {
        this.date = date;
        this.intake_time = intake_time;
        this.rate = rate;
    }
}
