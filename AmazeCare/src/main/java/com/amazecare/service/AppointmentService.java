package com.amazecare.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazecare.model.Appointment;
import com.amazecare.repository.AppointmentRepository;

@Service
public class AppointmentService {
    @Autowired private AppointmentRepository appointmentRepository;

    public Appointment create(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public List<Appointment> getByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public Optional<Appointment> getById(Long id) {
        return appointmentRepository.findById(id);
    }

    public Appointment update(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }
}