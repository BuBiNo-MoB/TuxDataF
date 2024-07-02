import { Component, OnInit } from '@angular/core';
import { iUser } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: iUser | null = null;
  profileImageFile: File | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.profileImageFile = file;
    }
  }

  updateProfile(): void {
    if (!this.currentUser) return;

    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(this.currentUser)], { type: 'application/json' }));
    if (this.profileImageFile) {
      formData.append('avatar', this.profileImageFile);
    }

    this.userService.updateUser(this.currentUser.id, formData).subscribe(updatedUser => {
      this.currentUser = updatedUser;
      this.profileImageFile = null;
    });
  }

  removeProfileImage(): void {
    if (!this.currentUser) return;

    this.userService.removeUserImage(this.currentUser.id).subscribe(() => {
      if (this.currentUser) {
        this.currentUser.avatar = '';
      }
    });
  }
}
