import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetRequest } from '../models/asset-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetRequestService {
  private apiUrl = 'http://localhost:9312/api/asset-requests';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AssetRequest[]> {
    return this.http.get<AssetRequest[]>(this.apiUrl);
  }

  getByEmployee(id: number): Observable<AssetRequest[]> {
    return this.http.get<AssetRequest[]>(`${this.apiUrl}/employee/${id}`);
  }

  create(request: AssetRequest): Observable<AssetRequest> {
    return this.http.post<AssetRequest>(this.apiUrl, request);
  }

  update(request: AssetRequest): Observable<AssetRequest> {
    return this.http.put<AssetRequest>(`${this.apiUrl}/${request.id}`, request);
  }

  updateStatus(id: number, status: 'APPROVED' | 'REJECTED'): Observable<AssetRequest> {
    return this.http.put<AssetRequest>(`${this.apiUrl}/${id}/status`, null, {
      params: { status }
    });
  }

}
