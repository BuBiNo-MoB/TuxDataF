import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DistributionService } from '../../../services/distribution.service';
import { iDistribution } from '../../../models/distribution';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

  distribution!: iDistribution;

  constructor(private route: ActivatedRoute, private distributionSvc: DistributionService, private router: Router) {
    this.route.params.subscribe(params => {
      let distributionId = params['id'];
      distributionSvc.getDistributionById(distributionId).subscribe(distribution => this.distribution = distribution);
    });
  }

  editDistribution(distribution: iDistribution) {
    this.distributionSvc.editDistribution(distribution).subscribe(() => this.router.navigate(['/']));
  }
}
