import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { AuthService } from '@services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  fullName = '';
  email = '';
  username = '';
  contactNumber = '';
  gender = '';
  dob: string = '';
  medicalHistory = '';
  password = '';
  confirmPassword = '';
  acceptTerms = false;

  readonly role = 'PATIENT';

  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!this.acceptTerms) {
      this.errorMessage = 'You must accept the terms and conditions.';
      return;
    }

    const payload = {
      fullName: this.fullName,
      email: this.email,
      username: this.username,
      contactNumber: this.contactNumber,
      gender: this.gender,
      dateOfBirth: this.dob,
      medicalHistory: this.medicalHistory,
      password: this.password,
      role: this.role
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.errorMessage = 'Registration failed. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
