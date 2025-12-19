package com.amazecare.dto;

import lombok.Data;

@Data
public class ConsultationResponse {
    private Long id;
    private Long appointmentId;
    private String symptoms;
    private String physicalExam;
    private String treatmentPlan;
    private String recommendedTests;
    private String prescription;

    private String patientName;
    private String doctorName;
    private String appointmentDate;
}
