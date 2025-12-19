package com.amazecare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazecare.model.Doctor;
import com.amazecare.repository.DoctorRepository;

@Service
public class DoctorService {
    @Autowired private DoctorRepository doctorRepository;

    public Doctor create(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAll() {
        return doctorRepository.findAll();
    }

    public List<Doctor> searchByName(String name) {
        return doctorRepository.findByFullNameContainingIgnoreCase(name);
    }

    public List<Doctor> getBySpecialty(String specialty) {
        return doctorRepository.findBySpecialtyIgnoreCase(specialty);
    }
}