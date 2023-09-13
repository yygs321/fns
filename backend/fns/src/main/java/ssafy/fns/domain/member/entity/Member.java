package ssafy.fns.domain.member.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
