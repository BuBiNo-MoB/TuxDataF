import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { iUser } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: iUser | null = null;

  constructor(private AuthService: AuthService) { }

  ngOnInit(): void {
    this.AuthService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }
}

