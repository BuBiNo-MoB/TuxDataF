import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { iUser } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.userUrl

  constructor(private http: HttpClient) { }

  getUsers(): Observable<iUser[]> {
    return this.http.get<iUser[]>(this.apiUrl);
  }
}
