package com.amazecare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amazecare.model.Consultation;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    Optional<Consultation> findByAppointmentId(Long appointmentId);
    List<Consultation> findByAppointment_Patient_Id(Long patientId);
}
