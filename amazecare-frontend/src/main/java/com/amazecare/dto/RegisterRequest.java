package com.amazecare.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @Email
    private String email;

    @NotNull
    private String role;

    @NotBlank
    private String fullName;
    private String gender;
    private LocalDate dob;
    private String contactNumber;
    private String medicalHistory;

    private String specialty;
    private Integer experience;
    private String qualification;
    private String designation;
    private Long hospitalId;

    private String department;
}
