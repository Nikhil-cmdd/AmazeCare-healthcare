package com.amazecare.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.amazecare.dto.ConsultationRequest;
import com.amazecare.dto.ConsultationResponse;
import com.amazecare.model.Appointment;
import com.amazecare.model.Consultation;
import com.amazecare.repository.AppointmentRepository;
import com.amazecare.repository.ConsultationRepository;
import com.amazecare.service.ConsultationService;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    @Autowired private ConsultationRepository consultationRepository;
    @Autowired private ConsultationService consultationService;
    @Autowired private AppointmentRepository appointmentRepository;

    
    @PostMapping
    public ResponseEntity<Consultation> addConsultation(@RequestBody ConsultationRequest request) {
        Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Consultation consultation = new Consultation();
        consultation.setAppointment(appointment);
        consultation.setSymptoms(request.getSymptoms());
        consultation.setPhysicalExam(request.getPhysicalExam());
        consultation.setTreatmentPlan(request.getTreatmentPlan());
        consultation.setRecommendedTests(request.getRecommendedTests());
        consultation.setPrescription(request.getPrescription());

        Consultation saved = consultationRepository.save(consultation);
        return ResponseEntity.ok(saved);
    }
    
    @GetMapping
    public List<ConsultationResponse> getAllConsultations() {
        return consultationService.getAllEnriched();
    }

    @GetMapping("/appointment/{id}")
    public ResponseEntity<Consultation> getByAppointmentId(@PathVariable Long id) {
        return consultationRepository.findByAppointmentId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consultation> getById(@PathVariable Long id) {
        Optional<Consultation> consultation = consultationRepository.findById(id);
        return consultation.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/patient/{id}")
    public List<Consultation> getByPatientId(@PathVariable Long id) {
        return consultationService.getByPatientId(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Consultation> updateConsultation(@PathVariable Long id, @RequestBody Consultation updated) {
        Consultation consultation = consultationRepository.findById(id).orElseThrow();

        consultation.setSymptoms(updated.getSymptoms());
        consultation.setPhysicalExam(updated.getPhysicalExam());
        consultation.setTreatmentPlan(updated.getTreatmentPlan());
        consultation.setRecommendedTests(updated.getRecommendedTests());
        consultation.setPrescription(updated.getPrescription());

        return ResponseEntity.ok(consultationRepository.save(consultation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteConsultation(@PathVariable Long id) {
        Consultation consultation = consultationRepository.findById(id).orElseThrow();
        consultationRepository.delete(consultation);
        return ResponseEntity.ok("Consultation deleted successfully.");
    }
}
