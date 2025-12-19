package com.amazecare.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data 
public class ConsultationRequest {
    @NotNull 
    private Long appointmentId;

    @NotBlank 
    private String symptoms;

    private String physicalExam;
    private String treatmentPlan;
    private String recommendedTests;
    private String prescription;
}
