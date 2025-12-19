import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Patient } from '@models/patient.model';
import { PatientService } from '@services/patient';

@Component({
  selector: 'app-patients',
  standalone: true,
  templateUrl: './patient.html',
  imports: [CommonModule, FormsModule]
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];
  patientForm: Patient = {} as Patient;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getAll().subscribe({
      next: data => this.patients = data
    });
  }

  addNewPatient() {
    this.patientForm = {} as Patient;
  }

  editPatient(p: Patient) {
    this.patientForm = { ...p };
  }

  savePatient() {
  const payload = {
    fullName: this.patientForm.fullName,
    dateOfBirth: this.patientForm.dateOfBirth,
    gender: this.patientForm.gender,
    contactNumber: this.patientForm.contactNumber,
    medicalHistory: this.patientForm.medicalHistory,
    username: this.patientForm.username,
    email: this.patientForm.email,
    password: this.patientForm.password
  };

  if (this.patientForm.id) {
    this.patientService.update(this.patientForm.id, payload).subscribe({
      next: () => {
        alert('Patient updated');
        this.patientForm = {} as Patient;
        this.loadPatients();
      }
    });
  } else {
    this.patientService.create(payload).subscribe({
      next: () => {
        alert('Patient added');
        this.patientForm = {} as Patient;
        this.loadPatients();
      }
    });
  }
}


  deletePatient(id: number) {
    if (!confirm('Are you sure?')) return;
    this.patientService.delete(id).subscribe({
      next: () => this.loadPatients()
    });
  }
}
