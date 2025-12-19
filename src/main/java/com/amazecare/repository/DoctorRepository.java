package com.amazecare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amazecare.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findByFullNameContainingIgnoreCase(String name);
    List<Doctor> findBySpecialtyIgnoreCase(String specialty);
}
