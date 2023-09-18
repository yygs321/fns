package ssafy.fns.domain.nutrient.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.member.entity.Gender;
import ssafy.fns.global.entity.BaseEntity;

@Entity
@NoArgsConstructor
@Getter
public class Nutrient extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="nutrient_id")
    private Long id;

    private Long age;

    private Gender gender;

    private Long kcal;

    private Long carbs;

    private Long protein;

    private Long fat;

    private Long pollination;

    private Long sugar;

    private Long dietaryFiber;

    private Long calcium;

    private Long potassium;

    private Long iron;

    private Long phosphorus;

    private Long vitaminA;

    private Long vitaminC;

    private Long vitaminD;

    private Long cholesterol;

    private Long acid;

    private Long transFat;

    @Builder
    public Nutrient(Long age, Gender gender, Long kcal, Long carbs, Long protein, Long fat,
            Long pollination, Long sugar, Long dietary_fiber, Long calcium, Long potassium,
            Long iron,
            Long phosphorus, Long vitaminA, Long vitaminC, Long vitaminD, Long cholesterol,
            Long acid,
            Long trans_fat) {
        this.age = age;
        this.gender = gender;
        this.kcal = kcal;
        this.carbs = carbs;
        this.protein = protein;
        this.fat = fat;
        this.pollination = pollination;
        this.sugar = sugar;
        this.dietaryFiber = dietary_fiber;
        this.calcium = calcium;
        this.potassium = potassium;
        this.iron = iron;
        this.phosphorus = phosphorus;
        this.vitaminA = vitaminA;
        this.vitaminC = vitaminC;
        this.vitaminD = vitaminD;
        this.cholesterol = cholesterol;
        this.acid = acid;
        this.transFat = trans_fat;
    }
}
