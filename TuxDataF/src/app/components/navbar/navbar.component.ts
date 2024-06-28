import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../pages/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuCollapsed = true;
  isUserLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data;
    });

    this.authSvc.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  logout() {
    this.authSvc.logout();
  }
}
