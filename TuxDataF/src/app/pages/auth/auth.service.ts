import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { iUser } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { iLoginData } from '../../models/login-data';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

type AccessData = {
  token: string,
  user: iUser
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  authSubject = new BehaviorSubject<iUser | null>(null);
  adminSubject = new BehaviorSubject<boolean>(false);

  user$ = this.authSubject.asObservable().pipe(
    tap(user => {
      if (!user) return;
      const newAccessData: AccessData = {
        token: this.getAccessToken(),
        user: user
      }
      const jsonUser = JSON.stringify(newAccessData);
      localStorage.setItem('accessData', jsonUser);
    })
  );

  isLoggedIn$ = this.user$.pipe(
    map(user => !!user),
    tap(user => this.syncIsLoggedIn = user)
  );

  syncIsLoggedIn: boolean = false;
  isAdmin$: Observable<boolean> = this.adminSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.restoreUser();
  }

  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;
  userUrl: string = environment.userUrl;

  register(formData: FormData): Observable<AccessData> {
    return this.http.post<AccessData>(this.registerUrl, formData);
  }

  login(loginData: iLoginData): Observable<AccessData> {
    return this.http.post<AccessData>(this.loginUrl, loginData)
      .pipe(tap(data => {
        this.authSubject.next(data.user);
        localStorage.setItem('accessData', JSON.stringify(data));
        const isAdmin = data.user.roles.some(role => role.roleType.toUpperCase() === 'ADMIN');
        this.adminSubject.next(isAdmin);
        this.autoLogout(data.token);
        this.updateCurrentUser();
      }));
  }

  getCurrentUser(): Observable<iUser | null> {
    return this.authSubject.asObservable();
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.adminSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  getAccessToken(): string {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return '';

    const accessData: AccessData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.token)) return '';

    return accessData.token;
  }

  autoLogout(jwt: string) {
    const expDate = this.jwtHelper.getTokenExpirationDate(jwt) as Date;
    const expMs = expDate.getTime() - new Date().getTime();

    setTimeout(() => {
      this.logout();
    }, expMs);
  }

  restoreUser() {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return;

    const accessData: AccessData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.token)) return;

    this.authSubject.next(accessData.user);
    const isAdmin = accessData.user.roles.some(role => role.roleType.toUpperCase() === 'ADMIN');
    this.adminSubject.next(isAdmin);
    this.autoLogout(accessData.token);
  }

  private updateCurrentUser() {
    const accessData = localStorage.getItem('accessData');
    if (accessData) {
      const parsedData = JSON.parse(accessData);
      this.authSubject.next(parsedData.user);
    }
  }

  errors(err: any) {
    switch (err.error) {
      case "Email and Password are required":
        return new Error('Email e password obbligatorie');
      case "Email already exists":
        return new Error('Utente esistente');
      case 'Email format is invalid':
        return new Error('Email scritta male');
      case 'Cannot find user':
        return new Error('utente inesistente');
      default:
        return new Error('Errore');
    }
  }
}
