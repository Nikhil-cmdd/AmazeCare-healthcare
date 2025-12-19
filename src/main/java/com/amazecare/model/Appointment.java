package com.amazecare.model;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Data
@Entity 
@Table (name = "appointment")
public class Appointment {
    @Id 
    @GeneratedValue(strategy = GenerationType .IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn (name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    private String symptoms;

    @Column (name = "preferred_date")
    private LocalDate preferredDate;

    @Column(name = "preferred_time")
    private LocalTime preferredTime;

    @Enumerated (EnumType.STRING)
    private Status status = Status.PENDING;

    public enum Status {
        PENDING, CONFIRMED, COMPLETED, CANCELLED
    }

}
