package ssafy.fns.domain.baseNutrient.entity;

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
import ssafy.fns.domain.baseNutrient.controller.dto.ModifyBaseRequestDto;
import ssafy.fns.domain.member.entity.Member;
import ssafy.fns.domain.nutrient.entity.Nutrient;
import ssafy.fns.global.entity.BaseEntity;

@Entity
@Getter
@NoArgsConstructor
public class BaseNutrient extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "base_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Double kcal;

    private Double carbs;

    private Double protein;

    private Double fat;

    private Double pollination;

    private Double sugar;

    private Double dietaryFiber;

    private Double calcium;

    private Double potassium;

    private Double iron;

    private Double phosphorus;

    private Double sodium;

    private Double vitaminA;

    private Double vitaminC;

    private Double vitaminD;

    private Double cholesterol;

    private Double acid;

    private Double transFat;

    @Builder
    public BaseNutrient(Member member, Double kcal, Double carbs, Double protein, Double fat,
            Double pollination, Double sugar, Double dietaryFiber, Double calcium, Double potassium,
            Double iron, Double phosphorus, Double sodium, Double vitaminA, Double vitaminC,
            Double vitaminD, Double cholesterol, Double acid, Double transFat) {
        this.member = member;
        this.kcal = kcal;
        this.carbs = carbs;
        this.protein = protein;
        this.fat = fat;
        this.pollination = pollination;
        this.sugar = sugar;
        this.dietaryFiber = dietaryFiber;
        this.calcium = calcium;
        this.potassium = potassium;
        this.iron = iron;
        this.phosphorus = phosphorus;
        this.sodium = sodium;
        this.vitaminA = vitaminA;
        this.vitaminC = vitaminC;
        this.vitaminD = vitaminD;
        this.cholesterol = cholesterol;
        this.acid = acid;
        this.transFat = transFat;
    }

    public static BaseNutrient from(Member member, Nutrient nutrient) {
        return BaseNutrient.builder()
                .member(member)
                .kcal(nutrient.getKcal())
                .carbs(nutrient.getCarbs())
                .protein(nutrient.getProtein())
                .fat(nutrient.getFat())
                .pollination(nutrient.getPollination())
                .sugar(nutrient.getSugar())
                .dietaryFiber(nutrient.getDietaryFiber())
                .calcium(nutrient.getCalcium())
                .potassium(nutrient.getPotassium())
                .iron(nutrient.getIron())
                .phosphorus(nutrient.getPhosphorus())
                .sodium(nutrient.getSodium())
                .vitaminA(nutrient.getVitaminA())
                .vitaminC(nutrient.getVitaminC())
                .vitaminD(nutrient.getVitaminD())
                .cholesterol(nutrient.getCholesterol())
                .acid(nutrient.getAcid())
                .transFat(nutrient.getTransFat())
                .build();
    }

    public static BaseNutrient from(Member member, ModifyBaseRequestDto requestDto) {
        return BaseNutrient.builder()
                .member(member)
                .kcal(requestDto.getKcal())
                .carbs(requestDto.getCarbs())
                .protein(requestDto.getProtein())
                .fat(requestDto.getFat())
                .pollination(requestDto.getPollination())
                .sugar(requestDto.getSugar())
                .dietaryFiber(requestDto.getDietaryFiber())
                .calcium(requestDto.getCalcium())
                .potassium(requestDto.getPotassium())
                .iron(requestDto.getIron())
                .phosphorus(requestDto.getPhosphorus())
                .sodium(requestDto.getSodium())
                .vitaminA(requestDto.getVitaminA())
                .vitaminC(requestDto.getVitaminC())
                .vitaminD(requestDto.getVitaminD())
                .cholesterol(requestDto.getCholesterol())
                .acid(requestDto.getAcid())
                .transFat(requestDto.getTransFat())
                .build();
    }

    public Double multi(Double nutrition, Double rate) {
        Double temp = nutrition * rate;
        return (double) Math.round(temp * 10) / 10.0;
    }
}
