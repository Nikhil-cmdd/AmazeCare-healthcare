import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from '@services/doctor';
import { Doctor } from '@models/doctor.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctors',
  standalone: true,
  templateUrl: './doctor.html',
  imports: [CommonModule, FormsModule]
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getAll().subscribe({
      next: data => this.doctors = data
    });
  }
}
