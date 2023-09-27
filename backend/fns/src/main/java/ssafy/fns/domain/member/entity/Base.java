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
import ssafy.fns.domain.member.controller.dto.BaseModifyRequestDto;
import ssafy.fns.domain.nutrient.entity.Nutrient;
import ssafy.fns.global.entity.BaseEntity;

//@Entity
@Getter
@NoArgsConstructor
public class Base extends BaseEntity {

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
    public Base(Member member, Double kcal, Double carbs, Double protein, Double fat,
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

    public void clear(Member member, Nutrient nutrient){
        this.member = member;
        this.kcal = nutrient.getKcal();
        this.carbs = nutrient.getCarbs();
        this.protein = nutrient.getProtein();
        this.fat = nutrient.getFat();
        this.pollination = nutrient.getPollination();
        this.sugar = nutrient.getSugar();
        this.dietaryFiber = nutrient.getDietaryFiber();
        this.calcium = nutrient.getCalcium();
        this.potassium = nutrient.getPotassium();
        this.iron = nutrient.getIron();
        this.phosphorus = nutrient.getPhosphorus();
        this.sodium = nutrient.getSodium();
        this.vitaminA = nutrient.getVitaminA();
        this.vitaminC = nutrient.getVitaminC();
        this.vitaminD = nutrient.getVitaminD();
        this.cholesterol = nutrient.getCholesterol();
        this.acid = nutrient.getAcid();
        this.transFat = nutrient.getTransFat();
    }

    public void update(BaseModifyRequestDto modifyRequestDto){
        this.kcal = modifyRequestDto.getKcal();
        this.carbs = modifyRequestDto.getCarbs();
        this.protein = modifyRequestDto.getProtein();
        this.fat = modifyRequestDto.getFat();
        this.pollination = modifyRequestDto.getPollination();
        this.sugar = modifyRequestDto.getSugar();
        this.dietaryFiber = modifyRequestDto.getDietaryFiber();
        this.calcium = modifyRequestDto.getCalcium();
        this.potassium = modifyRequestDto.getPotassium();
        this.iron = modifyRequestDto.getIron();
        this.phosphorus = modifyRequestDto.getPhosphorus();
        this.sodium = modifyRequestDto.getSodium();
        this.vitaminA = modifyRequestDto.getVitaminA();
        this.vitaminC = modifyRequestDto.getVitaminC();
        this.vitaminD = modifyRequestDto.getVitaminD();
        this.cholesterol = modifyRequestDto.getCholesterol();
        this.acid = modifyRequestDto.getAcid();
        this.transFat = modifyRequestDto.getTransFat();
    }

    public void diet(Double rate){
        this.kcal = multi(this.kcal, rate);
        this.carbs = multi(this.carbs, rate);
        this.protein = multi(this.protein, rate);
        this.fat = multi(this.fat, rate);
        this.pollination = multi(this.pollination, rate);
        this.sugar = multi(this.sugar, rate);
        this.dietaryFiber = multi(this.dietaryFiber, rate);
        this.calcium = multi(this.calcium, rate);
        this.potassium = multi(this.potassium, rate);
        this.iron = multi(this.iron, rate);
        this.phosphorus = multi(this.phosphorus, rate);
        this.sodium = multi(this.sodium, rate);
        this.vitaminA = multi(this.vitaminA, rate);
        this.vitaminC = multi(this.vitaminC, rate);
        this.vitaminD = multi(this.vitaminD, rate);
        this.cholesterol = multi(this.cholesterol, rate);
        this.acid = multi(this.acid, rate);
        this.transFat = multi(this.transFat, rate);
    }

    public Double multi(Double nutrition, Double rate){
        Double temp = nutrition*rate;
        return (double) Math.round(temp*10)/10.0;
    }
}
