import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistributionDetailsComponent } from './distribution-details.component';
import { EditDistributionComponent } from './edit-distribution/edit-distribution.component';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';

const routes: Routes = [
  { path: '', component: DistributionDetailsComponent },
  { path: 'edit/:id', component: EditDistributionComponent,
    canActivate: [AdminGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributionDetailsRoutingModule { }
