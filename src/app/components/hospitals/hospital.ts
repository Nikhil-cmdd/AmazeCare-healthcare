import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HospitalService } from '@services/hospital';
import { Hospital } from '@models/hospital.model';

@Component({
  selector: 'app-hospitals',
  standalone: true,
  templateUrl: './hospital.html',
  imports: [CommonModule, FormsModule]
})
export class HospitalComponent implements OnInit {
  hospitals: Hospital[] = [];
  hospitalForm: Hospital = {} as Hospital;

  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals() {
    this.hospitalService.getAll().subscribe({
      next: data => this.hospitals = data
    });
  }

  editHospital(h: Hospital) {
    this.hospitalForm = { ...h };
  }

  addNewHospital() {
    this.hospitalForm = {} as Hospital;
  }

  saveHospital() {
    if (this.hospitalForm.id) {
      this.hospitalService.update(this.hospitalForm).subscribe({
        next: () => {
          alert('Hospital updated');
          this.hospitalForm = {} as Hospital;
          this.loadHospitals();
        }
      });
    } else {
      this.hospitalService.create(this.hospitalForm).subscribe({
        next: () => {
          alert('Hospital added');
          this.hospitalForm = {} as Hospital;
          this.loadHospitals();
        }
      });
    }
  }

  deleteHospital(id: number) {
    if (!confirm('Are you sure you want to delete this hospital?')) return;
    this.hospitalService.delete(id).subscribe({
      next: () => this.loadHospitals()
    });
  }
}
