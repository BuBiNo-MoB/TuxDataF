import { ActivatedRoute, Router } from '@angular/router';
import { DistributionService } from './../../services/distribution.service';
import { Component, OnInit } from '@angular/core';
import { iDistribution } from '../../models/distribution';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-distribution-details',
  templateUrl: './distribution-details.component.html',
  styleUrls: ['./distribution-details.component.scss']
})
export class DistributionDetailsComponent implements OnInit {
  distributionId!: number;
  distributionArr: iDistribution[] = [];
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private distributionService: DistributionService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: { [key: string]: any }) => {
        this.distributionId = +params['id'];
        this.loadDistributionDetails();
      }
    });

    this.authService.isAdmin$.subscribe({
      next: isAdmin => {
        this.isAdmin = isAdmin;
      }
    });
  }

  loadDistributionDetails() {
    this.distributionService.getDistributionById(this.distributionId).subscribe({
      next: (product: iDistribution) => {
        this.distributionArr = [product];
      },
      error: (error) => {
        console.error('Error loading distribution details', error);
      }
    });
  }

  loadDistributionDetailsByKeyword(keyword: string) {
    this.distributionService.searchDistributions(keyword).subscribe(
      (products: iDistribution[]) => {
        this.distributionArr = products;
      },
      (error) => {
        console.error('Error loading distribution details', error);
      }
    );
  }

  deleteDistribution(id: number): void {
    this.distributionService.deleteDistribution(id).subscribe({
      next: () => {
        this.distributionArr = this.distributionArr.filter(distro => distro.id !== id);
      },
      error: (error) => {
        console.error('Error deleting distribution', error);
      }
    });
  }
}
