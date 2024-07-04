import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { DistributionService } from '../../services/distribution.service';
import { iDistribution } from '../../models/distribution';
import { AuthService } from '../../pages/auth/auth.service';
import { Router } from '@angular/router';
import { iUser } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  distributions: iDistribution[] = [];
  isAdmin: boolean = false;
  visibleDistributions: iDistribution[] = [];
  isUserLoggedIn: boolean = false;
  currentUser: iUser | null = null;

  constructor(private distributionService: DistributionService, private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((data) => {
      this.isUserLoggedIn = data;
      if (this.isUserLoggedIn) {
        this.userService.getCurrentUser().subscribe(user => {
          this.currentUser = user;
        });
      }
    });
  }

  fetchDistributions(): void {
    this.distributionService.getAll().subscribe({
      next: (data: iDistribution[]) => {
        this.distributions = data;
        this.visibleDistributions = this.distributions.slice(-2);
      },
      error: (error) => {
        console.error('Error fetching distributions', error);
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/distributionDetails', id]);
  }

  deleteDistribution(id: number): void {
    this.distributionService.deleteDistribution(id).subscribe({
      next: () => {
        this.distributions = this.distributions.filter(distro => distro.id !== id);
        this.visibleDistributions = this.distributions.slice(0, 4); // Aggiorna le distribuzioni visibili
      },
      error: (error) => {
        console.error('Error deleting distribution', error);
      }
    });
  }
}
