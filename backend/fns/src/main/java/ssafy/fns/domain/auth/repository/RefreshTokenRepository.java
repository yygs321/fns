package ssafy.fns.domain.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.fns.domain.auth.entity.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    RefreshToken findByToken(String token);

    RefreshToken findByEmail(String email);

    void deleteByEmail(String email);
}
