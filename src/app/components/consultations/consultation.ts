import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationService } from '@services/consultation';
import { Consultation } from '@models/consultation.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultations',
  standalone: true,
  templateUrl: './consultation.html',
  imports: [CommonModule, FormsModule]
})
export class ConsultationsComponent implements OnInit {
  consultations: Consultation[] = [];

  constructor(private consultationService: ConsultationService) {}

  ngOnInit(): void {
    this.consultationService.getAll().subscribe({
      next: data => this.consultations = data
    });
  }
}
