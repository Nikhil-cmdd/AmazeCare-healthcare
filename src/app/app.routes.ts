import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { AdminDashboard } from '@components/admin-dashboard/admin-dashboard';
import { DoctorDashboardComponent } from '@components/doctor-dashboard/doctor-dashboard';
import { PatientDashboardComponent } from '@components/patient-dashboard/patient-dashboard';
import { EmployeeDashboardComponent } from '@components/employee-dashboard/employee-dashboard';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    { path: 'admin-dashboard', component: AdminDashboard, canActivate: [authGuard] },
    { path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate: [authGuard] },
    { path: 'patient-dashboard', component: PatientDashboardComponent, canActivate: [authGuard] },
    { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [authGuard] },

    { path: 'hospitals', loadComponent: () => import('@components/hospitals/hospital').then(m => m.HospitalComponent) },
    { path: 'patients', loadComponent: () => import('@components/patients/patient').then(m => m.PatientComponent) },


    { path: '**', redirectTo: 'login' }
];

export const appRouter = provideRouter(routes);
