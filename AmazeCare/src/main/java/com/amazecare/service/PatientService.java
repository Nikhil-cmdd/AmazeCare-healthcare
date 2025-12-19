package com.amazecare.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazecare.model.Patient;
import com.amazecare.repository.PatientRepository;

@Service
public class PatientService {
    @Autowired private PatientRepository patientRepository;

    public Patient create(Patient patient) {
        return patientRepository.save(patient);
    }

    public Optional<Patient> getById(Long id) {
        return patientRepository.findById(id);
    }

    public List<Patient> searchByName(String name) {
        return patientRepository.findByFullNameContainingIgnoreCase(name);
    }

    public Patient update(Patient patient) {
        return patientRepository.save(patient);
    }
}