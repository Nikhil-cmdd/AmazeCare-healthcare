import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const role = authService.getUserRole().toLowerCase();

  if (!token || !role) {
    router.navigate(['/login']);
    return false;
  }

  const url = state.url;

  const allowed =
    (url.includes('admin-dashboard') && role === 'admin') ||
    (url.includes('doctor-dashboard') && role === 'doctor') ||
    (url.includes('patient-dashboard') && role === 'patient') ||
    (url.includes('employee-dashboard') && role === 'employee');

  if (!allowed) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
