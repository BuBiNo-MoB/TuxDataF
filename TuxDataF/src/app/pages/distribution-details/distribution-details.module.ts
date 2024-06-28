import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributionDetailsRoutingModule } from './distribution-details-routing.module';
import { DistributionDetailsComponent } from './distribution-details.component';


@NgModule({
  declarations: [
    DistributionDetailsComponent
  ],
  imports: [
    CommonModule,
    DistributionDetailsRoutingModule
  ]
})
export class DistributionDetailsModule { }
