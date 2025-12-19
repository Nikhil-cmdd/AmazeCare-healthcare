package com.amazecare.dto;

import lombok.Data;

@Data
public class EmployeeResponse {
    private Long id;
    private String fullName;
    private String department;
    private String contactNumber;
    private String email;
    private String gender;
    private String username;
    private String hospitalName;
}
