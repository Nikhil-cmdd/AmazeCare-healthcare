package com.amazecare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amazecare.model.Patient;
import com.amazecare.model.User;
import com.amazecare.repository.PatientRepository;
import com.amazecare.repository.UserRepository;
import com.amazecare.dto.PatientCreateRequest;
import com.amazecare.dto.PatientResponse;

@RestController 
@RequestMapping ("/api/patients")
public class PatientController {

    @Autowired private PatientRepository patientRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;


    @PostMapping
    public ResponseEntity<?> addPatient(@RequestBody PatientCreateRequest request) {
        try {
            
            User user = new User();
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(User.Role.PATIENT);
            user.setEmail(request.getEmail());
            user.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));

            User savedUser = userRepository.save(user);

            Patient patient = new Patient();
            patient.setUser(savedUser);
            patient.setFullName(request.getFullName());
            patient.setDob(request.getDob().toLocalDate());
            patient.setGender(request.getGender());
            patient.setContactNumber(request.getContactNumber());
            patient.setMedicalHistory(request.getMedicalHistory());

            return ResponseEntity.ok(patientRepository.save(patient));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating patient: " + e.getMessage());
        }
    }

    @PutMapping ("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient updated) {
        Patient patient = patientRepository.findById(id).orElseThrow();
        patient.setFullName(updated.getFullName());
        patient.setDob(updated.getDob());
        patient.setGender(updated.getGender());
        patient.setContactNumber(updated.getContactNumber());
        patient.setMedicalHistory(updated.getMedicalHistory());
        return ResponseEntity.ok(patientRepository.save(patient));
    }
    
    @GetMapping
    public List<PatientResponse> getAllPatients() {
        return patientRepository.findAll().stream().map(patient -> {
            PatientResponse dto = new PatientResponse();
            dto.setId(patient.getId());
            dto.setFullName(patient.getFullName());
            dto.setDob(patient.getDob());
            dto.setGender(patient.getGender().toString());
            dto.setContactNumber(patient.getContactNumber());
            dto.setMedicalHistory(patient.getMedicalHistory());

            if (patient.getUser() != null) {
                dto.setUsername(patient.getUser().getUsername());
                dto.setEmail(patient.getUser().getEmail());
            }

            return dto;
        }).toList();
    }

    @GetMapping("/search")
    public List<Patient> searchByName(@RequestParam String name) {
        return patientRepository.findByFullNameContainingIgnoreCase(name);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Long id) {
        Patient patient = patientRepository.findById(id).orElseThrow();
        User user = patient.getUser();

        patientRepository.delete(patient);
        userRepository.delete(user);

        return ResponseEntity.ok("Patient and user deleted successfully.");
    }

}
