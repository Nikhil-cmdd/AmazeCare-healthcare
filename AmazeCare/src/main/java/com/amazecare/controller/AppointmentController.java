package com.amazecare.controller;

import com.amazecare.dto.AppointmentRequest;
import com.amazecare.dto.AppointmentResponse;
import com.amazecare.model.Appointment;
import com.amazecare.model.Doctor;
import com.amazecare.model.Patient;
import com.amazecare.repository.AppointmentRepository;
import com.amazecare.repository.DoctorRepository;
import com.amazecare.repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController 
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired private AppointmentRepository appointmentRepository;
    @Autowired private DoctorRepository doctorRepository;
    @Autowired private PatientRepository patientRepository;

    private AppointmentResponse toResponse(Appointment appt) {
        AppointmentResponse res = new AppointmentResponse();
        res.setId(appt.getId());
        res.setStatus(appt.getStatus().name());
        res.setDate(appt.getPreferredDate());
        res.setTime(appt.getPreferredTime());
        res.setDoctorName(appt.getDoctor().getFullName());
        res.setPatientName(appt.getPatient().getFullName());
        res.setDoctorId(appt.getDoctor().getId());
        res.setPatientId(appt.getPatient().getId());
        res.setSymptoms(appt.getSymptoms());
        return res;
    }

    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(@RequestBody AppointmentRequest req) {
        Doctor doctor = doctorRepository.findById(req.getDoctorId())
            .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Patient patient = patientRepository.findById(req.getPatientId())
            .orElseThrow(() -> new RuntimeException("Patient not found"));

        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setSymptoms(req.getSymptoms());
        appointment.setPreferredDate(req.getPreferredDate());
        appointment.setPreferredTime(req.getPreferredTime());

        if (req.getStatus() != null) {
            appointment.setStatus(Appointment.Status.valueOf(req.getStatus()));
        } else {
            appointment.setStatus(Appointment.Status.PENDING);
        }

        Appointment saved = appointmentRepository.save(appointment);
        return ResponseEntity.ok(saved);
    }


    @GetMapping
    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/doctor/{id}")
    public List<AppointmentResponse> getByDoctor(@PathVariable Long id) {
        return appointmentRepository.findByDoctorId(id)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/patient/{id}")
    public List<AppointmentResponse> getByPatient(@PathVariable Long id) {
        return appointmentRepository.findByPatientId(id)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(@PathVariable Long id, @RequestParam Appointment.Status status) {
        Appointment appt = appointmentRepository.findById(id).orElseThrow();
        appt.setStatus(status);
        return ResponseEntity.ok(appointmentRepository.save(appt));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody AppointmentRequest request) {
        Appointment existing = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

        existing.setDoctor(doctorRepository.findById(request.getDoctorId()).orElseThrow());
        existing.setPatient(patientRepository.findById(request.getPatientId()).orElseThrow());
        existing.setSymptoms(request.getSymptoms());
        existing.setPreferredDate(request.getPreferredDate());
        existing.setPreferredTime(request.getPreferredTime());
        existing.setStatus(Appointment.Status.valueOf(request.getStatus()));

        return ResponseEntity.ok(appointmentRepository.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
