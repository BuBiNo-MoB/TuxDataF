import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { iDistribution } from '../../../models/distribution';
import { DistributionService } from '../../../services/distribution.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent {

  distributionUrl = environment.distroUrl;

  newDistribution: Partial<iDistribution> = {};

  constructor(private distroSvc: DistributionService, private http: HttpClient) {}

  createDistribution() {
    this.distroSvc.createDistribution(this.newDistribution).subscribe(() => {
      this.newDistribution = {};
    });
  }
}
