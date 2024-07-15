import { iDistribution } from './../../../models/distribution';
import { Component, OnInit } from '@angular/core';
import { DistributionService } from '../../../services/distribution.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrl: './new-releases.component.scss'
})
export class NewReleasesComponent implements OnInit {
  distributions: iDistribution[] = [];
  isAdmin: boolean = false;
  isUserLoggedIn: boolean = false;
  visibleDistributions: iDistribution[] = [];

  constructor(private distributionService: DistributionService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDistributions();
    this.authService.isAdmin$.subscribe({
      next: isAdmin => {
        this.isAdmin = isAdmin;
      }
    });
    this.authService.isLoggedIn$.subscribe((data) => {
      this.isUserLoggedIn = data;
    });
  }

  fetchDistributions(): void {
    this.distributionService.getAll().subscribe({
      next: (data: iDistribution[]) => {
        this.distributions = data.sort((a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        this.visibleDistributions = this.distributions.slice(0, 2);
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

  toggleLike(distro: iDistribution): void {
    if (distro.isLiked) {
      this.distributionService.removeLike(distro.id).subscribe({
        next: () => {
          distro.isLiked = false;
          distro.likes--;
        },
        error: (error: any) => {
          console.error('Error removing like', error);
        }
      });
    } else {
      this.distributionService.addLike(distro.id).subscribe({
        next: () => {
          distro.isLiked = true;
          distro.likes++;
        },
        error: (error: any) => {
          console.error('Error adding like', error);
        }
      });
    }
  }
}
