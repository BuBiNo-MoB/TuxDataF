import { AuthService } from './../../auth/auth.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { iUser } from '../../../models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  users: iUser[] = [];
  isAdmin: boolean = false;

  constructor(
    private UserService: UserService,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.AuthService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  fetchUsers(): void {
    this.UserService.getUsers().subscribe({
      next: (data: iUser[]) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users', error);
      },
    });
  }

  deleteUser(id: number): void {
    this.UserService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== id);
      },
      error: (error) => {
        console.error('Error deleting user', error);
      },
    });
  }
}
