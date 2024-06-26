import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { iLoginData } from '../../../models/login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginData: iLoginData = {
    username: 'mario@varano.it',
    password: 'password'
  };

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  signIn() {
    this.authSvc.login(this.loginData)
      .subscribe(data => {
        this.router.navigate(['']);
      });
  }
}
