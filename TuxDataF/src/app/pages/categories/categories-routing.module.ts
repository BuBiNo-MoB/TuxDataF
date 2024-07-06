import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { DesktopEnvironmentComponent } from './desktop-environment/desktop-environment.component';
import { DistributionListComponent } from './distribution-list/distribution-list.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: CategoriesComponent,
    canActivate: [AuthGuard] },
  { path: 'DE', component: DesktopEnvironmentComponent,
    canActivate: [AuthGuard] },
  { path: 'distributions-list', component: DistributionListComponent,
    canActivate: [AuthGuard] },
  { path: 'new-release', component: NewReleasesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule { }
