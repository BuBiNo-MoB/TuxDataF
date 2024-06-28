import { Component, OnInit } from '@angular/core';
import { DistributionService } from '../../services/distribution.service';
import { iDistribution } from '../../models/distribution';
import { AuthService } from '../../pages/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  distributions: iDistribution[] = [];
  isAdmin: boolean = false;

  constructor(private distributionService: DistributionService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchDistributions();
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  fetchDistributions(): void {
    this.distributionService.getAll().subscribe(
      (data: iDistribution[]) => {
        this.distributions = data;
      },
      (error) => {
        console.error('Error fetching distributions', error);
      }
    );
  }

  deleteDistribution(id: number): void {
    this.distributionService.deleteDistribution(id).subscribe(
      () => {
        this.distributions = this.distributions.filter(distro => distro.id !== id);
      },
      (error) => {
        console.error('Error deleting distribution', error);
      }
    );
  }
}
