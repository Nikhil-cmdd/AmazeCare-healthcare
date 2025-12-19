import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentRequest, AppointmentResponse } from '@models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private baseUrl = 'http://localhost:9312/api/appointments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AppointmentResponse[]> {
  return this.http.get<AppointmentResponse[]>(this.baseUrl);
  }

  create(appointment: AppointmentRequest): Observable<AppointmentRequest> {
    return this.http.post<AppointmentRequest>(this.baseUrl, appointment);
  }

  getByDoctor(doctorId: number): Observable<AppointmentResponse[]> {
  return this.http.get<AppointmentResponse[]>(`${this.baseUrl}/doctor/${doctorId}`);
  }

  getByPatient(patientId: number): Observable<AppointmentResponse[]> {
  return this.http.get<AppointmentResponse[]>(`${this.baseUrl}/patient/${patientId}`);
  }

  update(id: number, appointment: AppointmentRequest): Observable<AppointmentRequest> {
  return this.http.put<AppointmentRequest>(`${this.baseUrl}/${id}`, appointment);
  }

  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
