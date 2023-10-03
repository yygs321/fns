package ssafy.fns.domain.member.entity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.fns.domain.baseNutrient.entity.BaseNutrient;
import ssafy.fns.domain.exercise.entity.Exercise;
import ssafy.fns.domain.member.controller.dto.MemberProfileRequestDto;
import ssafy.fns.domain.member.controller.dto.UpdateProfileRequestDto;
import ssafy.fns.global.entity.BaseEntity;
import ssafy.fns.global.util.IntegerArrayConverter;

@Entity
@Getter
@NoArgsConstructor
@Slf4j
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Provider provider;

    private String nickname;

    private Boolean isPublished;

    private String gender;

    private Double height;

    private Long age;

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    private TargetWeight targetWeight;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Weight> weightList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Exercise> exerciseList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<BaseNutrient> baseNutrientList = new ArrayList<>();

    //조깅, 사이클, 등산, 수영, 줄넘기, 계단 오르기, 요가, 축구, 야구, 테니스, 배구, 골프
    @Convert(converter = IntegerArrayConverter.class)
    private List<Integer> sportsBookmarkList = new ArrayList<>(
            Arrays.asList(0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1));

    @Builder
    public Member(String email, String password, Provider provider, String nickname,
            Boolean isPublished, String gender, Double height, Long age) {
        this.email = email;
        this.password = password;
        this.provider = provider;
        this.nickname = nickname;
        this.isPublished = isPublished;
        this.gender = gender;
        this.height = height;
        this.age = age;
    }


    public void saveProfile(MemberProfileRequestDto requestDto) {
        this.nickname = requestDto.getNickname();
        this.isPublished = requestDto.getIsPublished();
        this.gender = requestDto.getGender();
        this.height = requestDto.getHeight();
        this.age = requestDto.getAge();
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateProfile(UpdateProfileRequestDto requestDto) {
        this.nickname = requestDto.getNickname();
        this.height = requestDto.getHeight();
        this.age = requestDto.getAge();
        this.isPublished = requestDto.getIsPublished();
    }

    public void updateTarget(TargetWeight targetWeight) {
        this.targetWeight = targetWeight;
    }

    public void addExercise(Exercise exercise) {
        this.exerciseList.add(exercise);
    }

    public void addBaseNutrient(BaseNutrient baseNutrient) {
        this.baseNutrientList.add(baseNutrient);
    }

    public void updateSportsBookmarkList(List<Integer> newSportsBookmarkList) {
        this.sportsBookmarkList = newSportsBookmarkList;
    }


    public void addWeight(Weight weight) {
        this.weightList.add(weight);
    }

    public Double getCurrentWeight() {
        return this.getWeightList()
                .get(this.getWeightList().size() - 1)
                .getWeight();
    }

}
