package com.amazecare.dto;

import lombok.Data;

@Data
public class DoctorCreateRequest {
    private String username;
    private String password;
    private String email;
    private String fullName;
    private String contactNumber;
    private String gender;
    private String specialty;
    private Integer experience;
    private String qualification;
    private String designation;
    private Long hospitalId;
}
