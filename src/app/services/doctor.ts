import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiUrl = 'http://localhost:9312/api/doctors';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  searchByName(name: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/search?name=${name}`);
  }

  getBySpecialty(specialty: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/specialty/${specialty}`);
  }

  create(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiUrl, doctor);
  }

  update(doctorForm: any): Observable<any> {
  const payload = {
    id: doctorForm.id,
    fullName: doctorForm.fullName,
    specialty: doctorForm.specialty,
    experience: doctorForm.experience,
    qualification: doctorForm.qualification,
    designation: doctorForm.designation,
    hospital: { id: doctorForm.hospitalId },
    user: {
      email: doctorForm.email,
      username: doctorForm.username,
      gender: doctorForm.gender,
      contactNumber: doctorForm.contactNumber
    }
  };
  return this.http.put(`${this.apiUrl}/${doctorForm.id}`, payload);
}


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
