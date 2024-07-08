import { Component, OnInit } from '@angular/core';
import { iDistribution } from '../../../models/distribution';
import { AuthService } from '../../auth/auth.service';
import { DistributionService } from '../../../services/distribution.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distribution-list',
  templateUrl: './distribution-list.component.html',
  styleUrls: ['./distribution-list.component.scss']
})
export class DistributionListComponent implements OnInit {
  distributions: iDistribution[] = [];
  isAdmin: boolean = false;
  visibleDistributions: iDistribution[] = [];
  sortOrder: string = 'name';

  constructor(
    private distributionService: DistributionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDistributions();
    this.authService.isAdmin$.subscribe({
      next: (isAdmin) => {
        this.isAdmin = isAdmin;
      }
    });
  }

  fetchDistributions(): void {
    this.distributionService.getAll().subscribe({
      next: (data: iDistribution[]) => {
        this.distributions = data;
        this.sortDistributions();
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
        this.sortDistributions(); // Aggiorna l'ordinamento dopo la cancellazione
      },
      error: (error: any) => {
        console.error('Error deleting distribution', error);
      }
    });
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOrder = selectElement.value;
    this.sortDistributions();
  }

  sortDistributions(): void {
    if (this.sortOrder === 'name') {
      this.visibleDistributions = [...this.distributions].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (this.sortOrder === 'releaseDate') {
      this.visibleDistributions = [...this.distributions].sort((a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      );
    }
  }
}
