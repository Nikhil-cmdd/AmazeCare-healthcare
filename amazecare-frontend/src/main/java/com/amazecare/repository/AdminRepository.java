package com.amazecare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amazecare.model.Admin;

public interface AdminRepository extends JpaRepository <Admin, Long> {
    List<Admin> findByFullNameContainingIgnoreCase(String name);
}
