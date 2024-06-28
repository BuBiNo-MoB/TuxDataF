import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributionDetailsRoutingModule } from './distribution-details-routing.module';
import { DistributionDetailsComponent } from './distribution-details.component';
import { EditDistributionComponent } from './edit-distribution/edit-distribution.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DistributionDetailsComponent,
    EditDistributionComponent
  ],
  imports: [
    CommonModule,
    DistributionDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DistributionDetailsModule { }
