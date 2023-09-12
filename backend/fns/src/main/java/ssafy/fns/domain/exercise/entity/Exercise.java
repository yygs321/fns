package ssafy.fns.domain.exercise.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.global.entity.BaseEntity;

@Entity
@NoArgsConstructor
@Getter
public class Exercise extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="exercise_id")
    private Long id;

    @OneToMany(mappedBy = "sports", fetch = FetchType.LAZY)
    private List<Sports> sportsList= new ArrayList<>();

    private LocalDateTime date;

    @Builder
    public Exercise(LocalDateTime date) {
        this.date = date;
    }
}
