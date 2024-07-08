import { Component, OnInit } from '@angular/core';
import { iDistribution } from '../../models/distribution';
import { ActivatedRoute, Router } from '@angular/router';
import { DistributionService } from '../../services/distribution.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-search-results-component',
  templateUrl: '../search-results-component/search-results-component.component.html',
  styleUrl: '../search-results-component/search-results-component.component.scss'
})

export class SearchResultsComponent implements OnInit {
  distributions: iDistribution[] = [];
  keyword: string = '';
  isAdmin: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private distributionService: DistributionService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'] || '';
      if (this.keyword) {
        this.searchDistributions();
      }
    });

    this.authService.isAdmin$.subscribe({
      next: (isAdmin) => {
        this.isAdmin = isAdmin;
      }
    });
  }

  searchDistributions(): void {
    this.distributionService.searchDistributions(this.keyword).subscribe({
      next: (distributions) => {
        this.distributions = distributions;
      },
      error: (error) => {
        console.error('Error fetching distributions:', error);
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
      },
      error: (error: any) => {
        console.error('Error deleting distribution', error);
      }
    });
  }


}
