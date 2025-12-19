package com.amazecare.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data 
public class AppointmentRequest {
    @NotNull 
    private Long doctorId;

    @NotNull
    private Long patientId;

    @NotBlank 
    private String symptoms;

    @NotNull
    private LocalDate preferredDate;

    @NotNull
    private LocalTime preferredTime;
    
    private String status;

}