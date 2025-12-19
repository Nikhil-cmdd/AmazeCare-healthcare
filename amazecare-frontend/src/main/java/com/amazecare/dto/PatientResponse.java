package com.amazecare.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class PatientResponse {
    private Long id;
    private String fullName;
    private LocalDate dob;
    private String gender;
    private String contactNumber;
    private String medicalHistory;

    private String username;
    private String email;
}
