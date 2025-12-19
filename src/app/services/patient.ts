import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private baseUrl = 'http://localhost:9312/api/patients';

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  /*create(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.baseUrl, patient);
  }

  update(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/${patient.id}`, patient);
  }*/

  create(payload: any): Observable<Patient> {
  return this.http.post<Patient>(this.baseUrl, payload);
  }

  update(id: number, payload: any): Observable<Patient> {
  return this.http.put<Patient>(`${this.baseUrl}/${id}`, payload);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchByName(name: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/search?name=${name}`);
  }

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
  }
}
