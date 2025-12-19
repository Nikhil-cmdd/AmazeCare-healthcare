import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospital } from '../models/hospital.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HospitalService {
  private apiUrl = 'http://localhost:9312/api/hospitals';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.apiUrl);
  }

  create(hospital: Hospital): Observable<Hospital> {
    return this.http.post<Hospital>(this.apiUrl, hospital);
  }

  update(hospital: Hospital): Observable<Hospital> {
    return this.http.put<Hospital>(`${this.apiUrl}/${hospital.id}`, hospital);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
