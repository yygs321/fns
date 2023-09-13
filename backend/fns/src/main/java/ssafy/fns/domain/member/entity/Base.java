package ssafy.fns.domain.member.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.global.entity.BaseEntity;

@Entity
@Getter
@NoArgsConstructor
public class Base extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "base_id")
    private Long id;

    private Long kcal;

    private Long carbs;

    private Long protein;

    private Long fat;

    private Long pollination;

    private Long sugar;

    private Long dietary_fiber;

    private Long calcium;

    private Long potassium;

    private Long iron;

    private Long phosphorus;

    private Long vitaminA;

    private Long vitaminC;

    private Long vitaminD;

    private Long cholesterol;

    private Long acid;

    private Long trans_fat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}
