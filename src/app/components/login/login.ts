import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthService } from '@services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        console.log("Login success response:", res);

        // Check if token and role are returned
        const token = res?.token;
        const role = res?.role;

        if (!token || !role) {
          this.errorMessage = 'Invalid login response from server';
          return;
        }

        // ✅ Store token
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        console.log("Token:", token);
        console.log("Role:", role);

        // ✅ Normalize role and route accordingly
        switch (role.toLowerCase()) {
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'doctor':
            this.router.navigate(['/doctor-dashboard']);
            break;
          case 'patient':
            this.router.navigate(['/patient-dashboard']);
            break;
          case 'employee':
            this.router.navigate(['/employee-dashboard']);
            break;
          default:
            this.errorMessage = 'Unknown user role';
            break;
        }
      },
      error: (err) => {
        console.error("Login error:", err);
        this.errorMessage = 'Invalid username or password';
      }
    });
  }



}
