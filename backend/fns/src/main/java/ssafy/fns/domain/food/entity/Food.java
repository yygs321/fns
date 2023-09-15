package ssafy.fns.domain.food.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.global.entity.BaseEntity;

@Entity
@Getter
@NoArgsConstructor
public class Food extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_id")
    private Long id;

    private String name;

    private Long volume;

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

    @OneToMany(mappedBy = "food", fetch = FetchType.LAZY)
    private List<Intake> intakeList = new ArrayList<>();

    @Builder
    public Food(String name, Long volume, Long kcal, Long carbs, Long protein, Long fat,
            Long pollination, Long sugar, Long dietary_fiber, Long calcium, Long potassium,
            Long iron,
            Long phosphorus, Long vitaminA, Long vitaminC, Long vitaminD, Long cholesterol,
            Long acid,
            Long trans_fat) {
        this.name = name;
        this.volume = volume;
        this.kcal = kcal;
        this.carbs = carbs;
        this.protein = protein;
        this.fat = fat;
        this.pollination = pollination;
        this.sugar = sugar;
        this.dietary_fiber = dietary_fiber;
        this.calcium = calcium;
        this.potassium = potassium;
        this.iron = iron;
        this.phosphorus = phosphorus;
        this.vitaminA = vitaminA;
        this.vitaminC = vitaminC;
        this.vitaminD = vitaminD;
        this.cholesterol = cholesterol;
        this.acid = acid;
        this.trans_fat = trans_fat;
    }
}
