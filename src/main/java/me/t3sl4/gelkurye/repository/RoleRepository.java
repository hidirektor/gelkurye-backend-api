package me.t3sl4.gelkurye.repository;

import java.util.Optional;

import me.t3sl4.gelkurye.models.struct.ERole;
import me.t3sl4.gelkurye.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole roleName);

  default void initRoles() {
    for (ERole role : ERole.values()) {
      findByName(role).orElseGet(() -> save(new Role(role)));
    }
  }
}
