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
  logoFile: File | null = null;
  desktopImageFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private distroSvc: DistributionService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      const distributionId = params['id'];
      this.distroSvc.getDistributionById(distributionId).subscribe(distribution => this.distribution = distribution);
    });
  }

  onFileSelected(event: Event, type: 'logo' | 'desktopImage'): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (type === 'logo') {
        this.logoFile = file;
      } else if (type === 'desktopImage') {
        this.desktopImageFile = file;
      }
    }
  }

  updateDistribution() {
    const formData = new FormData();
    formData.append('distribution', new Blob([JSON.stringify(this.distribution)], { type: 'application/json' }));
    if (this.logoFile) {
      formData.append('logo', this.logoFile);
    }
    if (this.desktopImageFile) {
      formData.append('desktopImage', this.desktopImageFile);
    }

    this.distroSvc.updateDistribution(this.distribution.id, formData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
