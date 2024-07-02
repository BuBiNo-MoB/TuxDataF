import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { DistributionListComponent } from './distribution-list/distribution-list.component';
import { DesktopEnvironmentComponent } from './desktop-environment/desktop-environment.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [
    CategoriesComponent,
    DistributionListComponent,
    DesktopEnvironmentComponent,
    NewReleasesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    RouterLink
  ]
})
export class CategoriesModule { }
