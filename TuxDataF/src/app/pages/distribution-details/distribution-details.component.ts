import { ActivatedRoute, Router } from '@angular/router';
import { DistributionService } from './../../services/distribution.service';
import { Component, OnInit } from '@angular/core';
import { iDistribution } from '../../models/distribution';

@Component({
  selector: 'app-distribution-details',
  templateUrl: './distribution-details.component.html',
  styleUrls: ['./distribution-details.component.scss']
})
export class DistributionDetailsComponent implements OnInit {
  distributionId!: number;
  distributionArr: iDistribution[] = [];

  constructor(private route: ActivatedRoute, private distributionService: DistributionService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: { [key: string]: any }) => {
      this.distributionId = +params['id'];
      this.loadDistributionDetails();
    });
  }

  loadDistributionDetails() {
    this.distributionService.getDistributionById(this.distributionId).subscribe(
      (product: iDistribution) => {
        this.distributionArr = [product];
      },
      (error) => {
        console.error('Error loading distribution details', error);
      }
    );
  }
}
