import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '@services/employee';
import { PatientService } from '@services/patient';
import { DoctorService } from '@services/doctor';
import { AppointmentService } from '@services/appointment';
import { AssetService } from '@services/asset';
import { AssetRequestService } from '@services/asset-request';
import { AuthService } from '@services/auth';

import { Employee } from '@models/employee.model';
import { Patient } from '@models/patient.model';
import { Doctor } from '@models/doctor.model';
import { AppointmentRequest } from '@models/appointment.model';
import { AssetRequest } from '@models/asset-request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.scss'],
  imports: [CommonModule, FormsModule]
})
export class EmployeeDashboardComponent implements OnInit {
  employee: Employee = {} as Employee;
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  assets: any[] = [];

  patientForm: Patient = {} as Patient;
  appointmentForm: AppointmentRequest = {} as AppointmentRequest;
  assetRequestForm: AssetRequest = {} as AssetRequest;
  assetRequests: AssetRequest[] = [];

  constructor(
    private employeeService: EmployeeService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private assetRequestService: AssetRequestService,
    private authService: AuthService,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
  const userId = this.authService.getUserId();
  this.employeeService.getByUserId(userId).subscribe({
    next: emp => {
      this.employee = emp;
      this.loadAssetRequests(emp.id);  // Now passes real employee ID
    }
  });
  this.loadPatients();
  this.loadDoctors();
  this.loadAssets();
}


  loadAssets() {
  this.assetService.getAll().subscribe({
    next: data => this.assets = data
  });
}

  loadEmployee(id: number) {
    this.employeeService.getById(id).subscribe({
      next: data => this.employee = data
    });
  }

  updateProfile() {
    this.employeeService.updateSelf(this.employee).subscribe({
      next: () => alert('Employee profile updated'),
      error: () => alert('Failed to update profile')
    });
  }

  loadPatients() {
    this.patientService.getAll().subscribe({
      next: data => this.patients = data
    });
  }

  editPatient(p: Patient) {
    this.patientForm = { ...p };
  }

  addNewPatient() {
    this.patientForm = {} as Patient;
  }

  savePatient() {
    const payload = {
      fullName: this.patientForm.fullName,
      dateOfBirth: this.patientForm.dateOfBirth || this.patientForm.dateOfBirth,
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
          this.loadPatients();
          this.patientForm = {} as Patient;
        }
      });
    } else {
      this.patientService.create(payload).subscribe({
        next: () => {
          alert('Patient added');
          this.loadPatients();
          this.patientForm = {} as Patient;
        }
      });
    }
  }



  loadDoctors() {
    this.doctorService.getAll().subscribe({
      next: data => this.doctors = data
    });
  }

  submitAppointment() {
    this.appointmentService.create(this.appointmentForm).subscribe({
      next: () => {
        alert('Appointment scheduled');
        this.appointmentForm = {} as AppointmentRequest;
      }
    });
  }

  requestAsset() {
  this.assetRequestForm.employee = this.employee; // correct Employee object

  this.assetRequestService.create(this.assetRequestForm).subscribe({
    next: () => {
      alert('Asset request submitted');
      this.assetRequestForm = {} as AssetRequest;
      this.loadAssetRequests(this.employee.id); // reload for current employee
    }
  });
}

  loadAssetRequests(employeeId: number) {
    this.assetRequestService.getByEmployee(employeeId).subscribe({
      next: data => this.assetRequests = data
    });
  }
  
}
