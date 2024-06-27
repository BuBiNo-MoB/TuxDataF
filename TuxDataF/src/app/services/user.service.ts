import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { iUser } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.userUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<iUser[]> {
    return this.http.get<iUser[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<iUser> {
    return this.http.get<iUser>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, formData: FormData): Observable<iUser> {
    return this.http.put<iUser>(`${this.apiUrl}/${id}`, formData);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  removeUserImage(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/avatar`);
  }
}
