package com.amazecare.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data 
@Entity 
@Table (name = "users")
public class User {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated (EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private String email;

    @Column(name = "created_at")
    private java.sql.Timestamp createdAt;
    
    @Column(name = "contact_number")
    private String contactNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;
    
    public enum Gender {
    	MALE, FEMALE, OTHER
    }


    public enum Role {
        ADMIN, DOCTOR, PATIENT, EMPLOYEE
    }

}
