import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistributionService } from '../../../services/distribution.service';
import { iDistribution } from '../../../models/distribution';

@Component({
  selector: 'app-edit-distribution',
  templateUrl: './edit-distribution.component.html',
  styleUrls: ['./edit-distribution.component.scss']
})
export class EditDistributionComponent implements OnInit {
  distributionId!: number;
  editForm!: FormGroup;
  distribution!: iDistribution;
  logoFile!: File | null;
  desktopImageFile!: File | null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private distributionService: DistributionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.distributionId = +params['id'];
      this.loadDistributionDetails();
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      currentVersion: ['', Validators.required],
      releaseDate: ['', Validators.required],
      description: ['', Validators.required],
      officialWebsite: ['', Validators.required],
      baseDistro: ['', Validators.required],
      supportedArchitecture: ['', Validators.required],
      packageType: ['', Validators.required],
      desktopEnvironment: [''],
      logoUrl: [''],
      desktopImageUrl: ['']
    });
  }

  loadDistributionDetails() {
    this.distributionService.getDistributionById(this.distributionId).subscribe(
      (distribution: iDistribution) => {
        this.distribution = distribution;
        this.editForm.patchValue(distribution);
      },
      error => {
        console.error('Error loading distribution details', error);
      }
    );
  }

  onFileSelected(event: any, type: string) {
    const file: File = event.target.files[0];
    if (type === 'logo') {
      this.logoFile = file;
    } else if (type === 'desktop') {
      this.desktopImageFile = file;
    }
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('distribution', new Blob([JSON.stringify(this.editForm.value)], { type: 'application/json' }));

    if (this.logoFile) {
      formData.append('logo', this.logoFile);
    } else if (this.distribution.logoUrl) {
      formData.append('logoUrl', this.distribution.logoUrl);
    }

    if (this.desktopImageFile) {
      formData.append('desktopImage', this.desktopImageFile);
    } else if (this.distribution.desktopImageUrl) {
      formData.append('desktopImageUrl', this.distribution.desktopImageUrl);
    }

    this.distributionService.updateDistribution(this.distributionId, formData).subscribe(
      response => {
        this.router.navigate(['/distributionDetails', this.distributionId]);
      },
      error => {
        console.error('Error updating distribution', error);
      }
    );
  }
}
