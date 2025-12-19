import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultation } from '../models/consultation.model';

@Injectable({ providedIn: 'root' })
export class ConsultationService {
  private baseUrl = 'http://localhost:9312/api/consultations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(this.baseUrl);
  }

  getByAppointmentId(appointmentId: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.baseUrl}/appointment/${appointmentId}`);
  }

  getByPatientId(patientId: number): Observable<Consultation[]> {
  return this.http.get<Consultation[]>(`${this.baseUrl}/patient/${patientId}`);
  }

  create(consultation: Consultation): Observable<Consultation> {
    return this.http.post<Consultation>(this.baseUrl, consultation);
  }

  update(id: number, consultation: Consultation): Observable<Consultation> {
    return this.http.put<Consultation>(`${this.baseUrl}/${id}`, consultation);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
