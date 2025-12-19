package com.amazecare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amazecare.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctorId(Long doctorId);
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByStatus(Appointment.Status status);
}
