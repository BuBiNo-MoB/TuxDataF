import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { iUser } from '../../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerData: Partial<iUser> = {};
  selectedFile: File | null = null;

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  signUp(event: Event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(this.registerData)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile);
    }

    this.authSvc.register(formData)
      .subscribe(data => {
        this.router.navigate(['']);
      });
  }
}
