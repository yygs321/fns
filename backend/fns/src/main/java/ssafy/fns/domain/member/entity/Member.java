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
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.exercise.entity.Exercise;
import ssafy.fns.global.entity.BaseEntity;
import ssafy.fns.global.util.IntegerArrayConverter;

@Entity
@Getter
@NoArgsConstructor
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

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Long height;

    private Long weight;

    private Integer age;

    private Long targetWeight;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Exercise> exerciseList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Base> baseList = new ArrayList<>();

    //조깅, 사이클, 등산, 수영, 줄넘기, 계단 오르기, 요가, 축구, 야구, 테니스, 배구, 골프
    @Convert(converter = IntegerArrayConverter.class)
    private List<Integer> sportsList = new ArrayList<>(
            Arrays.asList(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1));

    @Builder
    public Member(String email, String password, Provider provider, String nickname,
            Boolean isPublished, Gender gender, Long height, Long weight, Integer age,
            Long targetWeight) {
        this.email = email;
        this.password = password;
        this.provider = provider;
        this.nickname = nickname;
        this.isPublished = isPublished;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.targetWeight = targetWeight;
    }
}
