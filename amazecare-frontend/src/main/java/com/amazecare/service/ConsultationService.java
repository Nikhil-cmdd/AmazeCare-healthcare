package com.amazecare.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazecare.dto.ConsultationResponse;
import com.amazecare.model.Appointment;
import com.amazecare.model.Consultation;
import com.amazecare.repository.ConsultationRepository;


@Service
public class ConsultationService {
    @Autowired private ConsultationRepository consultationRepository;

    public Consultation create(Consultation consultation) {
        return consultationRepository.save(consultation);
    }

    public Optional<Consultation> getByAppointmentId(Long appointmentId) {
        return consultationRepository.findByAppointmentId(appointmentId);
    }
    
    public List<Consultation> getByPatientId(Long patientId) {
        return consultationRepository.findByAppointment_Patient_Id(patientId);
    }
    
    public List<ConsultationResponse> getAllEnriched() {
        List<Consultation> consultations = consultationRepository.findAll();

        return consultations.stream().map(consultation -> {
            Appointment appointment = consultation.getAppointment();
            ConsultationResponse response = new ConsultationResponse();

            response.setId(consultation.getId());
            response.setAppointmentId(appointment.getId());
            response.setSymptoms(consultation.getSymptoms());
            response.setPhysicalExam(consultation.getPhysicalExam());
            response.setTreatmentPlan(consultation.getTreatmentPlan());
            response.setRecommendedTests(consultation.getRecommendedTests());
            response.setPrescription(consultation.getPrescription());

            if (appointment.getPatient() != null)
                response.setPatientName(appointment.getPatient().getFullName());

            if (appointment.getDoctor() != null)
                response.setDoctorName(appointment.getDoctor().getFullName());

            if (appointment.getPreferredDate() != null)
                response.setAppointmentDate(appointment.getPreferredDate().toString());

            return response;
        }).collect(Collectors.toList());
    }

}
