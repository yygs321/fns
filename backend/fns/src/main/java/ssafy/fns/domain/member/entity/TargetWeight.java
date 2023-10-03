package ssafy.fns.domain.member.entity;

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
import ssafy.fns.global.entity.BaseEntity;

@Getter
@Entity
@NoArgsConstructor
public class TargetWeight extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "weight_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Double targetWeight;
    private Long dietDuration;

    @Builder
    public TargetWeight(Member member, Double targetWeight, Long dietDuration) {
        this.member = member;
        this.targetWeight = targetWeight;
        this.dietDuration = dietDuration;
    }
}
