package com.eventboard.springjwt.repository;

import java.util.Optional;

import com.eventboard.springjwt.models.ERole;
import com.eventboard.springjwt.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
