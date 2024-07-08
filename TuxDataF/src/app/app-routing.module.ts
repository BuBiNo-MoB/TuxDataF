import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';
import { SearchResultsComponent } from './pages/search-results-component/search-results-component.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'distributionDetails',
    loadChildren: () =>
      import('./pages/distribution-details/distribution-details.module').then(
        (m) => m.DistributionDetailsModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'distributionDetails/:id',
    loadChildren: () =>
      import('./pages/distribution-details/distribution-details.module').then(
        (m) => m.DistributionDetailsModule
      ),
      canActivate: [AuthGuard]
  },
  { path: 'search',
    component: SearchResultsComponent },
  {
    path: 'categories',
    loadChildren: () =>
      import('./pages/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/page404/page404.module').then((m) => m.Page404Module),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
