import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:9312/api/users';

  constructor(private http: HttpClient) {}

  findByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/username/${username}`);
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }
}
