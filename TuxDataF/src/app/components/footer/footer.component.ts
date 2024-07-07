import { Component } from '@angular/core';
import { AuthService } from '../../pages/auth/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
isUserLoggedIn = false;

constructor(
  private authSvc: AuthService,
  private userService: UserService){}

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((data) => {
      this.isUserLoggedIn = data;
    });
  }
}
