package com.amazecare.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data 
@Entity 
@Table (name = "patient")
public class Patient {
    @Id 
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn (name = "id")
    private User user;

    @Column (name = "full_name", nullable = false)
    private String fullName;

    private LocalDate  dob;

    @Enumerated (EnumType.STRING)
    private Gender gender;

    @Column(name = "contact_number")
    private String contactNumber;

    @Column(name = "medical_history")
    private String medicalHistory;

    public enum Gender {
        MALE, FEMALE, OTHER
    }

}
