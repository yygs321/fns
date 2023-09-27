package ssafy.fns.domain.member.entity;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.fns.global.entity.BaseEntity;

@Getter
@Entity
@NoArgsConstructor
@Slf4j
public class WeightHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "weight_id")
    private Long id;

    private Long memberId;

    private Double weight;

    @Builder
    public WeightHistory(Long memberId, Double weight) {
        this.memberId = memberId;
        this.weight = weight;
    }
}
