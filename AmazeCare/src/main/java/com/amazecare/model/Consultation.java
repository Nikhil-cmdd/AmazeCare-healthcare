package com.amazecare.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data 
@Entity 
@Table (name = "consultation")
public class Consultation {
    @Id 
    @GeneratedValue(strategy = GenerationType .IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn (name = "appointment_id")
    private Appointment appointment;

    private String symptoms;

    @Column (name = "physical_exam")
    private String physicalExam;

    @Column(name = "treatment_plan")
    private String treatmentPlan;

    @Column(name = "recommended_tests")
    private String recommendedTests;

    private String prescription;

}
