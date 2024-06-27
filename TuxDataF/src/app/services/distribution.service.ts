import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { iDistribution } from '../models/distribution';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  distributionUrl = environment.distroUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<iDistribution[]> {
    return this.http.get<iDistribution[]>(this.distributionUrl);
  }

  createDistribution(formData: FormData): Observable<iDistribution> {
    return this.http.post<iDistribution>(this.distributionUrl, formData);
  }

  getDistributionById(id: number): Observable<iDistribution> {
    const url = `${this.distributionUrl}/${id}`;
    return this.http.get<iDistribution>(url);
  }

  deleteDistribution(id: number): Observable<void> {
    return this.http.delete<void>(`${this.distributionUrl}/${id}`);
  }

  updateDistribution(id: number, formData: FormData): Observable<iDistribution> {
    return this.http.put<iDistribution>(`${this.distributionUrl}/${id}`, formData);
  }
}
