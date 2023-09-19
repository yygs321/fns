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
/*
                   음식명 name
                 * 식품중량 volume
                 * 에너지(kcal) kcal
                 * 탄수화물 carbs
                 * 단백질 protein;
                 * 지방 fat
                 * 수분 pollination
                 * 당 sugar
                 * 식이섬유 dietaryFiber
                 * 칼슘 calcium
                 * 칼륨 potassium
                 * 철 iron
                 * 인 phosphorus
                 * 나트륨 sodium
                 * 비타민A vitaminA
                 * 비타민C vitaminC
                 * 비타민D vitaminD
                 * 콜레스테롤 cholesterol
                 * 포화지방산 acid
                 * 트랜스지방산 transFat
                 * 업체명
                 * */
@Entity
@Getter
@NoArgsConstructor
public class Food extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_id")
    private Long id;

    private String name;

    private int volume;

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

    @OneToMany(mappedBy = "food", fetch = FetchType.LAZY)
    private List<Intake> intakeList = new ArrayList<>();

    public Food(String name, int volume, Double kcal, Double carbs, Double protein, Double fat,
            Double pollination, Double sugar, Double dietaryFiber, Double calcium, Double potassium,
            Double iron, Double phosphorus, Double sodium, Double vitaminA, Double vitaminC,
            Double vitaminD, Double cholesterol, Double acid, Double transFat) {
        this.name = name;
        this.volume = volume;
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
