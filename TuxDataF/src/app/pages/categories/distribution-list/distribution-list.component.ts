import { Component, OnInit } from '@angular/core';
import { iDistribution } from '../../../models/distribution';
import { AuthService } from '../../auth/auth.service';
import { DistributionService } from '../../../services/distribution.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distribution-list',
  templateUrl: './distribution-list.component.html',
  styleUrl: './distribution-list.component.scss'
})
export class DistributionListComponent implements OnInit{
  distributions: iDistribution[] = [];
  isAdmin: boolean = false;
  visibleDistributions: iDistribution[] = [];

  constructor(private distributionService: DistributionService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDistributions();
    this.authService.isAdmin$.subscribe({
      next: isAdmin => {
        this.isAdmin = isAdmin;
      }
    });
  }

  fetchDistributions(): void {
    this.distributionService.getAll().subscribe({
      next: (data: iDistribution[]) => {
        this.distributions = data;
        this.visibleDistributions = this.distributions.slice(-2);
      },
      error: (error: any) => {
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
      error: (error: any) => {
        console.error('Error deleting distribution', error);
      }
    });
  }
}
