import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistributionDetailsComponent } from './distribution-details.component';
import { EditDistributionComponent } from './edit-distribution/edit-distribution.component';

const routes: Routes = [
  { path: '', component: DistributionDetailsComponent },
  { path: 'edit/:id', component: EditDistributionComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributionDetailsRoutingModule { }
