package com.amazecare.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data 
public class AppointmentResponse {
    private Long id;
    private String status;
    private LocalDate date;
    private LocalTime time;
    private String doctorName;
    private String patientName;

    private Long doctorId;
    private Long patientId;
    private String symptoms;
}