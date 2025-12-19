import { Component, OnInit } from '@angular/core';
import { Doctor } from '@models/doctor.model';
import { AppointmentResponse } from '@models/appointment.model';
import { Consultation } from '@models/consultation.model';

import { AuthService } from '@services/auth';
import { DoctorService } from '@services/doctor';
import { AppointmentService } from '@services/appointment';
import { ConsultationService } from '@services/consultation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.html',
  styleUrls: ['./doctor-dashboard.scss'],
  imports: [CommonModule, FormsModule]
})

export class DoctorDashboardComponent implements OnInit {
  doctor: Doctor = {} as Doctor;
  appointments: AppointmentResponse[] = [];
  consultationForm: Partial<Consultation> = {};
  editMode: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private consultationService: ConsultationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    console.log('Decoded userId:', userId);

    this.loadDoctor(userId);
    this.loadAppointments(userId);
  }

  loadDoctor(userId: number) {
    this.doctorService.getAll().subscribe({
      next: (data) => {
        const found = data.find((d) => d.user?.id === userId);
        console.log("Doctor found for userId", userId, found);
        if (found) this.doctor = found;
        this.loadAppointments(found.id);
      }
    });
  }

  updateProfile() {
    const payload = {
      id: this.doctor.id,
      fullName: this.doctor.fullName,
      specialty: this.doctor.specialty,
      experience: this.doctor.experience,
      qualification: this.doctor.qualification,
      designation: this.doctor.designation,
      hospital: this.doctor.hospital?.id ? { id: this.doctor.hospital.id } : null,
      user: {
        id: this.doctor.user?.id,
        email: this.doctor.user?.email,
        username: this.doctor.user?.username ?? '',
        gender: this.doctor.user?.gender,
        contactNumber: this.doctor.user?.contactNumber
      }
    };

    console.log('Payload:', payload);

    this.doctorService.update(payload).subscribe({
      next: () => alert('Profile updated successfully')
    });
  }

  loadAppointments(doctorId: number) {
    this.appointmentService.getByDoctor(doctorId).subscribe({
      next: (data) => {
        console.log('Appointments:', data); // Debug to checkif Appointmetnservice is returning anything
        this.appointments = data; // Already enriched with patientName, date, time
      }
    });
  }

  prepareConsultation(appt: AppointmentResponse) {
    this.consultationForm = {
      appointmentId: appt.id,
      symptoms: appt.symptoms
    };
  }

  submitConsultation() {
    console.log('Submitting consultation:', this.consultationForm);
    if (!this.consultationForm.appointmentId) {
      alert('No appointment selected!');
      return;
    }

    this.consultationService.create(this.consultationForm as Consultation).subscribe({
      next: () => {
        alert('Consultation saved');
        this.consultationForm = {};
      }
    });
  }

}
