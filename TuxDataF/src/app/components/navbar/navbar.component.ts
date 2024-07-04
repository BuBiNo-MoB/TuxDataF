import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../pages/auth/auth.service';
import { Router } from '@angular/router';
import { DistributionService } from '../../services/distribution.service';
import { iUser } from '../../models/user';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuCollapsed = true;
  isUserLoggedIn: boolean = false;
  isAdmin: boolean = false;
  searchQuery: string = '';
  currentUser: iUser | null = null;

  constructor(
    private authSvc: AuthService,
    private userService: UserService,
    private router: Router,
    private distributionService: DistributionService
  ) {}

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((data) => {
      this.isUserLoggedIn = data;
      if (this.isUserLoggedIn) {
        this.userService.getCurrentUser().subscribe(user => {
          this.currentUser = user;
        });
      }
    });

    this.authSvc.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  logout() {
    this.authSvc.logout();
  }

  search() {
    if (this.searchQuery.trim()) {
      this.distributionService.searchDistributions(this.searchQuery).subscribe({
        next: (distributions) => {
          if (distributions.length > 0) {
            this.router.navigate(['/distributionDetails', distributions[0].id]);
          } else {
            console.error('No distributions found');
          }
        },
      });
    }
  }
}
