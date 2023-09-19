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
    public Nutrient(Long age, Gender gender, Double kcal, Double carbs, Double protein, Double fat,
            Double pollination, Double sugar, Double dietaryFiber, Double calcium, Double potassium,
            Double iron, Double phosphorus, Double sodium, Double vitaminA, Double vitaminC,
            Double vitaminD, Double cholesterol, Double acid, Double transFat) {
        this.age = age;
        this.gender = gender;
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
}
