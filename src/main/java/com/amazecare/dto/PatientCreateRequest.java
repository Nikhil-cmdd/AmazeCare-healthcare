package com.amazecare.dto;

import lombok.Data;
//import com.amazecare.model.User.Gender;
import com.amazecare.model.Patient.Gender; // ✅ correct one


import java.sql.Date;

@Data
public class PatientCreateRequest {
    private String fullName;
    private Date dob;
    private Gender gender;
    private String contactNumber;
    private String medicalHistory;

    private String username;
    private String password;
    private String email;
}
