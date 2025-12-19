import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = 'http://localhost:9312/api/employees';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getById(id: number): Observable<Employee> {
  return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  getByUserId(userId: number) {
  return this.http.get<Employee>(`${this.baseUrl}/user/${userId}`);
  }

  searchByName(name: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/search?name=${name}`);
  }

  create(employee: any): Observable<any> {
  return this.http.post(`${this.baseUrl}`, employee);
}

  update(id: number, employee: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}`, employee);
  }

  updateSelf(employee: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/${employee.id}`, employee);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
