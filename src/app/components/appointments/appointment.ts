import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppointmentService } from '@services/appointment';
import { AppointmentResponse, AppointmentStatus } from '@models/appointment.model';

@Component({
  selector: 'app-appointments',
  standalone: true,
  templateUrl: './appointment.html',
  imports: [CommonModule, FormsModule]
})
export class AppointmentsComponent implements OnInit {
  appointments: AppointmentResponse[] = [];
  selectedStatus: { [id: number]: AppointmentStatus } = {};

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAll().subscribe({
      next: data => {
        this.appointments = data;
        data.forEach(appt => {
          this.selectedStatus[appt.id] = appt.status;
        });
      }
    });
  }

  updateStatus(id: number): void {
    const appt = this.appointments.find(a => a.id === id);
    if (!appt) return;

    const updated = {
      id: appt.id,
      doctorId: appt.doctorId,
      patientId: appt.patientId,
      symptoms: appt.symptoms,
      preferredDate: appt.date,
      preferredTime: appt.time,
      status: this.selectedStatus[id]

    };

    this.appointmentService.update(updated.id, updated).subscribe({
      next: () => {
        alert('Appointment status updated');
        this.loadAppointments();
      }
    });
  }
}