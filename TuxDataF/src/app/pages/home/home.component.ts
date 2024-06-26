import { Component, OnInit } from '@angular/core';
import { DistributionService } from '../../services/distribution.service';
import { iDistribution } from '../../models/distribution';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  distributions: iDistribution[] = [];

  constructor(private DistributionService: DistributionService) {}

  ngOnInit(): void {
    this.fetchDistributions();
  }

  fetchDistributions(): void {
    this.DistributionService.getAll().subscribe(
      (data: iDistribution[]) => {
        this.distributions = data;
      },
      (error) => {
        console.error('Error fetching distributions', error);
      }
    );
  }
}
