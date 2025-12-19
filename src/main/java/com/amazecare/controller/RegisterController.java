package com.amazecare.controller;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amazecare.dto.RegisterRequest;
import com.amazecare.model.Admin;
import com.amazecare.model.Doctor;
import com.amazecare.model.Employee;
import com.amazecare.model.Patient;
import com.amazecare.model.User;
import com.amazecare.repository.AdminRepository;
import com.amazecare.repository.DoctorRepository;
import com.amazecare.repository.EmployeeRepository;
import com.amazecare.repository.HospitalRepository;
import com.amazecare.repository.PatientRepository;
import com.amazecare.repository.UserRepository;

import jakarta.validation.Valid;

@RestController 
@RequestMapping("/api/auth")
public class RegisterController {

    @Autowired private UserRepository userRepository;
    @Autowired private AdminRepository adminRepository;
    @Autowired private DoctorRepository doctorRepository;
    @Autowired private PatientRepository patientRepository;
    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private HospitalRepository hospitalRepository;


    @PostMapping ("/register")
    public ResponseEntity<?> register(@Valid  @RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }


        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(User.Role.valueOf(request.getRole().toUpperCase()));
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));


        User savedUser = userRepository.save(user);


        switch (savedUser.getRole()) {
            case ADMIN -> {
                Admin admin = new Admin();
                admin.setUser(savedUser);
                admin.setFullName(request.getFullName());
                adminRepository.save(admin);
            }
            case DOCTOR -> {
                Doctor doctor = new Doctor();
                doctor.setUser(savedUser);
                doctor.setFullName(request.getFullName());
                doctor.setSpecialty(request.getSpecialty());
                doctor.setExperience(request.getExperience());
                doctor.setQualification(request.getQualification());
                doctor.setDesignation(request.getDesignation());

                if (request.getHospitalId() != null) {
                	hospitalRepository.findById(request.getHospitalId()).ifPresent(doctor::setHospital);
                }


                doctorRepository.save(doctor);
            }

            case PATIENT -> {
            	if (request.getGender() == null || request.getDob() == null) {
                    return ResponseEntity.badRequest().body("Missing patient details.");
                }
            	
                Patient patient = new Patient();
                patient.setUser(savedUser);
                patient.setFullName(request.getFullName());
                patient.setDob(request.getDob());
                patient.setGender(Patient.Gender.valueOf(request.getGender().toUpperCase()));
                patient.setContactNumber(request.getContactNumber());
                patient.setMedicalHistory(request.getMedicalHistory());
                patientRepository.save(patient);
            }

            case EMPLOYEE -> {
                Employee employee = new Employee();
                employee.setUser(savedUser);
                employee.setFullName(request.getFullName());
                employee.setDepartment(request.getDepartment() != null ? request.getDepartment() : "General");
                employee.setContactNumber(request.getContactNumber() != null ? request.getContactNumber() : "0000000000");
                employeeRepository.save(employee);
            }

        }

        return ResponseEntity.ok(Map.of("message", "User registered successfully."));
    }
}
