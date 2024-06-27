import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DistributionService } from '../../../services/distribution.service';
import { iDistribution } from '../../../models/distribution';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent {
  newDistribution: Partial<iDistribution> = {};
  logoFile: File | null = null;
  desktopImageFile: File | null = null;

  constructor(private distroSvc: DistributionService, private router: Router) {}

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

  createDistribution() {
    const formData = new FormData();
    formData.append('distribution', new Blob([JSON.stringify(this.newDistribution)], { type: 'application/json' }));
    if (this.logoFile) {
      formData.append('logo', this.logoFile);
    }
    if (this.desktopImageFile) {
      formData.append('desktopImage', this.desktopImageFile);
    }

    this.distroSvc.createDistribution(formData).subscribe(() => {
      this.newDistribution = {};
      this.logoFile = null;
      this.desktopImageFile = null;
      this.router.navigate(['/']);
    });
  }
}
