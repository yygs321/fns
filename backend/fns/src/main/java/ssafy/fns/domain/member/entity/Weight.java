package ssafy.fns.domain.member.entity;

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
import ssafy.fns.domain.member.controller.dto.WeightRequestDto;
import ssafy.fns.global.entity.BaseEntity;

@Getter
@Entity
@NoArgsConstructor
public class Weight extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "weight_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Double weight;

    @Builder
    public Weight(Member member, Double weight) {
        this.member = member;
        this.weight = weight;
    }

    public static Weight from(Member member, WeightRequestDto requestDto) {
        return Weight.builder()
                .member(member)
                .weight(requestDto.getWeight())
                .build();
    }
}
