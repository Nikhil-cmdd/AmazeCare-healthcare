import { Component, OnInit } from '@angular/core';
import { PatientService } from '@services/patient';
import { AppointmentService } from '@services/appointment';
import { ConsultationService } from '@services/consultation';
import { DoctorService } from '@services/doctor';

import { Patient } from '@models/patient.model';
import { AppointmentRequest, AppointmentResponse } from '@models/appointment.model';
import { Consultation } from '@models/consultation.model';
import { Doctor } from '@models/doctor.model';

import { AuthService } from '@services/auth';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.html',
  styleUrls: ['./patient-dashboard.scss'],
  imports: [CommonModule, FormsModule]
})
export class PatientDashboardComponent implements OnInit {
  patient: Patient = {} as Patient;
  appointments: AppointmentResponse[] = [];
  appointmentForm: AppointmentRequest = {} as AppointmentRequest;
  doctors: Doctor[] = [];
  consultations: Consultation[] = [];

  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private consultationService: ConsultationService,
    private doctorService: DoctorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.loadPatient(userId);
    this.loadAppointments(userId);
    this.loadDoctors();
    this.loadConsultations(userId);
  }

  loadPatient(id: number) {
    this.patientService.getById(id).subscribe({
      next: data => this.patient = data
    });
  }

  updateProfile() {
  const payload = {
    fullName: this.patient.fullName,
    gender: this.patient.gender,
    contactNumber: this.patient.contactNumber,
    dateOfBirth: this.patient.dateOfBirth,
    medicalHistory: this.patient.medicalHistory,
    username: this.patient.username,
    email: this.patient.email,
    password: this.patient.password
  };

  this.patientService.update(this.patient.id, payload).subscribe({
    next: () => alert('Profile updated successfully'),
    error: () => alert('Failed to update profile')
  });
}


  loadAppointments(patientId: number) {
    this.appointmentService.getByPatient(patientId).subscribe({
      next: data => this.appointments = data
    });
  }

  loadDoctors() {
    this.doctorService.getAll().subscribe({
      next: data => this.doctors = data
    });
  }

  editAppointment(appt: AppointmentResponse) {
    this.appointmentForm = {
      id: appt.id,
      doctorId: this.doctors.find(doc => doc.fullName === appt.doctorName)?.id || 0,
      patientId: this.authService.getUserId(),
      preferredDate: appt.date,
      preferredTime: appt.time,
      symptoms: appt.symptoms,
      status: appt.status
    };
  }

  cancelAppointment(id: number) {
    this.appointmentService.cancel(id).subscribe({
      next: () => {
        alert('Appointment cancelled');
        this.loadAppointments(this.authService.getUserId());
      }
    });
  }

  submitAppointment() {
    const patientId = this.authService.getUserId();

    this.appointmentForm.patientId = patientId;
    if (this.appointmentForm.id) {
      this.appointmentService.update(this.appointmentForm.id, this.appointmentForm).subscribe({
        next: () => {
          alert('Appointment updated');
          this.clearForm();
          this.loadAppointments(patientId);
        }
      });
    } else {
      this.appointmentService.create(this.appointmentForm).subscribe({
        next: () => {
          alert('Appointment scheduled');
          this.clearForm();
          this.loadAppointments(patientId);
        }
      });
    }
  }

  clearForm() {
    this.appointmentForm = {} as AppointmentRequest;
  }

  loadConsultations(patientId: number) {
    this.consultationService.getByPatientId(patientId).subscribe({
      next: data => this.consultations = data
    });
  } 
}
