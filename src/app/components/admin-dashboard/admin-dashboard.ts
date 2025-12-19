import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '@services/doctor';
import { PatientService } from '@services/patient';
import { EmployeeService } from '@services/employee';
import { HospitalService } from '@services/hospital';
import { AppointmentService } from '@services/appointment';
import { AssetService } from '@services/asset';
import { AssetRequestService } from '@services/asset-request';
import { Consultation } from '@models/consultation.model';
import { ConsultationService } from '@services/consultation';
import { AppointmentRequest } from '@models/appointment.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss'],
  imports: [CommonModule, FormsModule]
})
export class AdminDashboard {
  selectedTab: string = 'doctors';

  doctors: any[] = [];
  patients: any[] = [];
  employees: any[] = [];
  hospitals: any[] = [];
  appointments: any[] = [];
  assets: any[] = [];
  filteredAssets: any[] = [];
  assetRequests: any[] = [];
  //consultations: any[] = [];

  // Doctor Model form state
  doctorModelOpen = false;
  editingDoctor = false;

  doctorForm: any = {
    fullName: '',
    username: '',
    email: '',
    contactNumber: '',
    gender: '',
    specialty: '',
    hospitalId: '',
    experience: '',
    qualification: '',
    password: ''
  };

  // Patient Model form state
  patientModelOpen = false;
  editingPatient = false;

  patientForm: any = {
    fullName: '',
    username: '',
    email: '',
    contactNumber: '',
    gender: '',
    dob: '',
    medicalHistory: '',
    password: ''
  }

  // Employee Model form state
  employeeModelOpen = false;
  editingEmployee = false;

  employeeForm: any = {
    fullName: '',
    email: '',
    contactNumber: '',
    gender: '',
    department: '',
    hospitalId: '',
    username: '',
    password: ''
  }

  //Hospital Model form state
  editingHospital = false;

  hospitalForm: any = {
    id: null,
    name: '',
    city: '',
    location: ''
  };

  // Appointment model state
  appointmentModelOpen = false;
  editingAppointment = false;

  appointmentForm: any = {
    id: null,
    patientId: '',
    doctorId: '',
    symptoms: '',
    preferredDate: '',
    preferredTime: '',
    status: 'PENDING'
  };

  // Asset Model form state
  editingAsset = false;
  assetModelOpen = false;
  assetFilter = 'ALL';

  assetForm: any = {
    id: null,
    name: '',
    category: 'LAPTOP',
    status: 'AVAILABLE',
    description: ''
  };

  // Asset Request Model form state
  assetRequestFilter = 'ALL';
  filteredAssetRequests: any[] = [];

  //Consultation Model form state
  consultationModelOpen = false;
  editingConsultation = false;
  consultations: Consultation[] = [];
  consultationForm: Consultation = {} as Consultation;


  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private employeeService: EmployeeService,
    private hospitalService: HospitalService,
    private appointmentService: AppointmentService,
    private assetService: AssetService,
    private assetRequestService: AssetRequestService,
    private consultationService: ConsultationService
  ) {}

  ngOnInit() {
    this.loadDoctors();
    this.loadHospitals(); // Required for the doctor form dropdown
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    switch (tab) {
      case 'doctors': this.loadDoctors(); break;
      case 'patients': this.loadPatients(); break;
      case 'employees': this.loadEmployees(); break;
      case 'hospitals': this.loadHospitals(); break;
      case 'appointments': this.loadAppointments(); break;
      case 'assets': this.loadAssets(); break;
      case 'assetRequests': this.loadAssetRequests(); break;
      case 'consultations': this.loadConsultations(); break;
    }
  }

  // ========== LOAD METHODS ==========

  loadDoctors() {
    this.doctorService.getAll().subscribe(data => this.doctors = data);
  }

  loadPatients() {
    this.patientService.getAll().subscribe(data => this.patients = data);
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe(data => this.employees = data);
  }

  loadHospitals() {
    this.hospitalService.getAll().subscribe(data => this.hospitals = data);
  }

  loadAppointments() {
    this.appointmentService.getAll().subscribe(data => this.appointments = data);
  }

  loadAssets() {
    this.assetService.getAll().subscribe(data => { this.assets = data;
      this.applyAssetFilter();
    });
  }

  loadAssetRequests() {
    this.assetRequestService.getAll().subscribe(data => {
      this.assetRequests = data;
      this.applyAssetRequestFilter();
    });
  }

  loadConsultations() {
    this.consultationService.getAll().subscribe(data => this.consultations = data);
  }

  // ========== DOCTOR CRUD ==========

  openDoctorModel() {
    this.resetDoctorForm();
    this.editingDoctor = false;
    this.doctorModelOpen = true;
  }

  closeDoctorModel() {
    this.doctorModelOpen = false;
  }

  editDoctor(doctor: any) {
    this.editingDoctor = true;
    this.doctorForm = {
      id: doctor.id,
      fullName: doctor.fullName,
      username: doctor.user?.username || '',// ← Add this
      email: doctor.user?.email || '',
      contactNumber: doctor.user?.contactNumber || '',
      gender: doctor.user?.gender || '',
      specialty: doctor.specialty,
      hospitalId: doctor.hospital?.id || '',
      experience: doctor.experience,
      qualification: doctor.qualification,
      password: ''
    };
    this.doctorModelOpen = true;
  }

  deleteDoctor(id: number) {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.delete(id).subscribe(() => this.loadDoctors());
    }
  }

  submitDoctorForm() {
    if (this.editingDoctor) {
      this.doctorService.update(this.doctorForm).subscribe(() => {
        this.closeDoctorModel();
        this.loadDoctors();
      });
    } else {
      this.doctorService.create(this.doctorForm).subscribe(() => {
        this.closeDoctorModel();
        this.loadDoctors();
      });
    }
  }

  resetDoctorForm() {
    this.doctorForm = {
      fullName: '',
      username: '', // ← Add this
      email: '',
      contactNumber: '',
      gender: '',
      specialty: '',
      hospitalId: '',
      experience: '',
      qualification: '',
      password: ''
    };
  }
  openPatientModel() {
    this.resetPatientForm();
    this.editingPatient = false;
    this.patientModelOpen = true;
  }

  closePatientModel() {
    this.patientModelOpen = false;
  }

  editPatient(patient: any) {
    this.editingPatient = true;
    this.patientForm = {
      id: patient.id,
      fullName: patient.fullName,
      username: patient.username,
      email: patient.email,
      contactNumber: patient.contactNumber,
      gender: patient.gender,
      dob: patient.dob,
      medicalHistory: patient.medicalHistory,
      password: ''
    };
    this.patientModelOpen = true;
  }

  deletePatient(id: number) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.delete(id).subscribe(() => this.loadPatients());
    }
  }

  submitPatientForm() {
    const payload = {
      fullName: this.patientForm.fullName,
      dob: formatDate(this.patientForm.dob, 'yyyy-MM-dd', 'en-US'),
      gender: this.patientForm.gender?.toUpperCase(),
      contactNumber: this.patientForm.contactNumber,
      medicalHistory: this.patientForm.medicalHistory,
      username: this.patientForm.username,
      password: this.patientForm.password,
      email: this.patientForm.email
    };

    if (this.editingPatient) {
      this.patientService.update(this.patientForm.id, payload).subscribe(() => {
        this.closePatientModel();
        this.loadPatients();
      });
    } else {
      this.patientService.create(payload).subscribe(() => {
        this.closePatientModel();
        this.loadPatients();
      });
    }
  }


  resetPatientForm() {
    this.patientForm = {
      fullName: '',
      username: '',
      email: '',
      contactNumber: '',
      gender: '',
      dob: '',
      medicalHistory: '',
      password: ''
    };
  }

  // ========== EMPLOYEE CRUD ==========

  openEmployeeModel() {
    this.resetEmployeeForm();
    this.editingEmployee = false;
    this.employeeModelOpen = true;
  }

  closeEmployeeModel() {
    this.employeeModelOpen = false;
  }

  editEmployee(employee: any) {
    this.editingEmployee = true;
    this.employeeForm = {
      id: employee.id,
      fullName: employee.fullName,
      email: employee.user?.email || '',
      contactNumber: employee.user?.contactNumber || '',
      gender: employee.user?.gender || '',
      department: employee.department,
      username: employee.user?.username || '',
      password: '',
      hospitalId: employee.hospital?.id || ''
    };
    this.employeeModelOpen = true;
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.delete(id).subscribe(() => this.loadEmployees());
    }
  }

  submitEmployeeForm() {
  const payload = {
    fullName: this.employeeForm.fullName,
    department: this.employeeForm.department,
    contactNumber: this.employeeForm.contactNumber,
    hospital: this.employeeForm.hospitalId ? { id: this.employeeForm.hospitalId } : null,
    user: {
      username: this.employeeForm.username,
      email: this.employeeForm.email,
      gender: this.employeeForm.gender,
      contactNumber: this.employeeForm.contactNumber,
      ...(this.employeeForm.password && { password: this.employeeForm.password })
    }
  };
  
  if (this.editingEmployee) {
    this.employeeService.update(this.employeeForm.id, payload).subscribe(() => {
      this.closeEmployeeModel();
      this.loadEmployees();
    });
  } else {
    this.employeeService.create(payload).subscribe(() => {
      this.closeEmployeeModel();
      this.loadEmployees();
    });
  }
}


  resetEmployeeForm() {
    this.employeeForm = {
      fullName: '',
      email: '',
      contactNumber: '',
      gender: '',
      department: '',
      hospitalId: '',
      username: '',
      password: ''
    };
  }

// Hospital actions
  openNewHospitalForm() {
    this.editingHospital = false;
    this.hospitalForm = {
      id: null,
      name: '',
      city: '',
      location: ''
    };
  }

  editHospital(h: any) {
    this.editingHospital = true;
    this.hospitalForm = { ...h };
  }

  saveHospital() {
    if (this.editingHospital) {
      this.hospitalService.update(this.hospitalForm).subscribe(() => {
        this.loadHospitals();
        this.openNewHospitalForm();
      });
    } else {
      this.hospitalService.create(this.hospitalForm).subscribe(() => {
        this.loadHospitals();
        this.openNewHospitalForm();
      });
    }
  }

  deleteHospital(id: number) {
    if (!confirm('Are you sure you want to delete this hospital?')) return;
    this.hospitalService.delete(id).subscribe(() => {
    this.loadHospitals();
  });
}

  // ========== APPOINTMENTS ==========
  openAppointmentModel() {
    this.editingAppointment = false;
    this.resetAppointmentForm();
    this.loadPatients();
    this.loadDoctors();
    this.appointmentModelOpen = true;
  }

  closeAppointmentModel() {
    this.appointmentModelOpen = false;
  }

  editAppointment(a: any) {
    this.editingAppointment = true;
    this.appointmentForm = {
      id: a.id,
      patientId: a.patientId,
      doctorId: a.doctorId,
      symptoms: a.symptoms,
      preferredDate: a.date,
      preferredTime: a.time,
      status: a.status
    };
    this.appointmentModelOpen = true;
  }

  deleteAppointment(id: number) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.appointmentService.cancel(id).subscribe(() => this.loadAppointments());
    }
  }

  submitAppointmentForm() {
    const payload: AppointmentRequest = {
      doctorId: this.appointmentForm.doctorId,
      patientId: this.appointmentForm.patientId,
      symptoms: this.appointmentForm.symptoms,
      preferredDate: this.appointmentForm.preferredDate,
      preferredTime: this.appointmentForm.preferredTime,
      status: this.appointmentForm.status || 'NEW'
    };

    if (this.editingAppointment) {
      this.appointmentService.update(this.appointmentForm.id!, payload).subscribe(() => {
        this.closeAppointmentModel();
        this.loadAppointments();
      });
    } else {
      this.appointmentService.create(payload).subscribe(() => {
        this.closeAppointmentModel();
        this.loadAppointments();
      });
    }
  }


  resetAppointmentForm() {
    this.appointmentForm = {
      id: null,
      patientId: '',
      doctorId: '',
      symptoms: '',
      preferredDate: '',
      preferredTime: '',
      status: 'PENDING'
    };
  }

  // ======= ASSET ==========
  openAssetModel() {
    this.resetAssetForm();
    this.editingAsset = false;
    this.assetModelOpen = true;
  }

  editAsset(asset: any) {
    this.assetForm = { ...asset };
    this.editingAsset = true;
    this.assetModelOpen = true;
  }

  closeAssetModel() {
    this.assetModelOpen = false;
  }

  submitAssetForm() {
    if (this.editingAsset) {
      this.assetService.update(this.assetForm).subscribe(() => {
        this.closeAssetModel();
        this.loadAssets();
      });
    } else {
      this.assetService.create(this.assetForm).subscribe(() => {
        this.closeAssetModel();
        this.loadAssets();
      });
    }
  }

  deleteAsset(id: number) {
    if (confirm('Are you sure you want to delete this asset?')) {
      this.assetService.delete(id).subscribe(() => this.loadAssets());
    }
  }

  resetAssetForm() {
    this.assetForm = {
      id: null,
      name: '',
      category: 'LAPTOP',
      status: 'AVAILABLE',
      description: ''
    };
  }

  applyAssetFilter() {
    this.filteredAssets = this.assetFilter === 'ALL'
      ? [...this.assets]
      : this.assets.filter(a => a.category === this.assetFilter);
  }

  // ======= ASSET REQUESTS ==========
  applyAssetRequestFilter() {
    this.filteredAssetRequests = this.assetRequestFilter === 'ALL'
      ? [...this.assetRequests]
      : this.assetRequests.filter(r => r.status === this.assetRequestFilter);
  }

  approveRequest(id: number) {
    this.assetRequestService.updateStatus(id, 'APPROVED').subscribe(() => {
      this.loadAssetRequests();
    });
  }

  rejectRequest(id: number) {
    this.assetRequestService.updateStatus(id, 'REJECTED').subscribe(() => {
      this.loadAssetRequests();
    });
  }

  // ======= CONSULTATION ==========
  openConsultationModel() {
    this.resetConsultationForm();
    this.editingConsultation = false;
    this.consultationModelOpen = true;
  }

  editConsultation(c: Consultation) {
    this.editingConsultation = true;
    this.consultationForm = { ...c };
    this.consultationModelOpen = true;
  }

  submitConsultationForm() {
    if (this.editingConsultation && this.consultationForm.id) {
      this.consultationService.update(this.consultationForm.id, this.consultationForm).subscribe(() => {
        this.consultationModelOpen = false;
        this.loadConsultations();
      });
    } else {
      this.consultationService.create(this.consultationForm).subscribe(() => {
        this.consultationModelOpen = false;
        this.loadConsultations();
      });
    }
  }

  deleteConsultation(id: number) {
    if (confirm('Are you sure you want to delete this consultation?')) {
      this.consultationService.delete(id).subscribe(() => this.loadConsultations());
    }
  }

  resetConsultationForm() {
    this.consultationForm = {
      appointmentId: 0,
      symptoms: '',
      physicalExam: '',
      treatmentPlan: '',
      recommendedTests: '',
      prescription: ''
    };
  }

}

