import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../models/admin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:9312/api/admins';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  create(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.apiUrl, admin);
  }

  update(admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.apiUrl}/${admin.id}`, admin);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
