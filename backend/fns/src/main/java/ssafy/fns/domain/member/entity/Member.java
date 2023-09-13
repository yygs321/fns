package ssafy.fns.domain.member.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.fns.domain.exercise.entity.Exercise;
import ssafy.fns.global.entity.BaseEntity;

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

    private String provider;

    private String nickname;

    private Boolean is_published;

    private String gender;

    private Long height;

    private Long weight;

    private Integer age;

    private Long target_weight;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Exercise> exerciseList=new ArrayList<>();

    @Builder
    public Member(String email, String password, String provider, String nickname,
            Boolean is_published,
            String gender, Long height, Long weight, Integer age, Long target_weight) {
        this.email = email;
        this.password = password;
        this.provider = provider;
        this.nickname = nickname;
        this.is_published = is_published;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.target_weight = target_weight;
    }
}
