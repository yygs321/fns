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

    private String volume;

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

    private Long sodium;

    private Long vitaminA;

    private Long vitaminC;

    private Long vitaminD;

    private Long cholesterol;

    private Long acid;

    private Long transFat;

    @OneToMany(mappedBy = "food", fetch = FetchType.LAZY)
    private List<Intake> intakeList = new ArrayList<>();
}
