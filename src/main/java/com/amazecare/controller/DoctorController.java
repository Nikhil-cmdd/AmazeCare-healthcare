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

import com.amazecare.dto.DoctorCreateRequest;
import com.amazecare.model.Doctor;
import com.amazecare.model.User;
import com.amazecare.model.User.Role;
import com.amazecare.repository.DoctorRepository;
import com.amazecare.repository.HospitalRepository;
import com.amazecare.repository.UserRepository;

@RestController 
@RequestMapping ("/api/doctors")
public class DoctorController {

    private final PasswordEncoder passwordEncoder;

    @Autowired private DoctorRepository doctorRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private HospitalRepository hospitalRepository;


    DoctorController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping
    public ResponseEntity<?> createDoctor(@RequestBody DoctorCreateRequest request) {
        try {
            
            User user = new User();
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(Role.DOCTOR);
            user.setEmail(request.getEmail());

            userRepository.save(user);

            Doctor doctor = new Doctor();
            doctor.setUser(user);
            doctor.setFullName(request.getFullName());
            doctor.setSpecialty(request.getSpecialty());
            doctor.setExperience(request.getExperience());
            doctor.setQualification(request.getQualification());
            doctor.setDesignation(request.getDesignation());
            doctor.setHospital(hospitalRepository.findById(request.getHospitalId()).orElseThrow());

            Doctor saved = doctorRepository.save(doctor);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating doctor: " + e.getMessage());
        }
    }


    @GetMapping 
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @GetMapping("/category")
    public List<Doctor> getBySpecialty(@RequestParam String specialty) {
        return doctorRepository.findBySpecialtyIgnoreCase(specialty);
    }

    @GetMapping("/search")
    public List<Doctor> searchByName(@RequestParam String name) {
        return doctorRepository.findByFullNameContainingIgnoreCase(name);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDoctor(@PathVariable Long id, @RequestBody Doctor updatedDoctor) {
        try {
            Doctor doctor = doctorRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            doctor.setFullName(updatedDoctor.getFullName());
            doctor.setSpecialty(updatedDoctor.getSpecialty());
            doctor.setExperience(updatedDoctor.getExperience());
            doctor.setQualification(updatedDoctor.getQualification());
            doctor.setDesignation(updatedDoctor.getDesignation());

            if (updatedDoctor.getHospital() != null && updatedDoctor.getHospital().getId() != null) {
                doctor.setHospital(hospitalRepository.findById(updatedDoctor.getHospital().getId())
                        .orElseThrow(() -> new RuntimeException("Hospital not found")));
            }

            User user = doctor.getUser();
            User updatedUser = updatedDoctor.getUser();

            if (user != null && updatedUser != null) {
                if (updatedUser.getEmail() != null)
                    user.setEmail(updatedUser.getEmail());

                if (updatedUser.getUsername() != null)
                    user.setUsername(updatedUser.getUsername());

                if (updatedUser.getGender() != null)
                    user.setGender(updatedUser.getGender());

                if (updatedUser.getContactNumber() != null)
                    user.setContactNumber(updatedUser.getContactNumber());

                userRepository.save(user);
            }

            Doctor savedDoctor = doctorRepository.save(doctor);
            return ResponseEntity.ok(savedDoctor);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating doctor: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
        try {
            Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

            User user = doctor.getUser();

            doctorRepository.delete(doctor);

            if (user != null) {
                userRepository.delete(user);
            }

            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error deleting doctor: " + e.getMessage());
        }
    }

}
