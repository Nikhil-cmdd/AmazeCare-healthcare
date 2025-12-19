import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asset } from '../models/asset.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private apiUrl = 'http://localhost:9312/api/assets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl);
  }

  create(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(this.apiUrl, asset);
  }

  update(asset: Asset): Observable<Asset> {
    return this.http.put<Asset>(`${this.apiUrl}/${asset.id}`, asset);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
