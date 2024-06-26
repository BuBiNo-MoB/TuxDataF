import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authSvc:AuthService,
    private router:Router//per i redirect
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    if(!this.authSvc.syncIsLoggedIn){
      this.router.navigate(['/auth/login'])
    }

    return this.authSvc.syncIsLoggedIn
  }

  //questa è l'alternativa se vuoi usare l'observable isLoggedIn$
  //canActivatePro(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): MaybeAsync<GuardResult> {

  //   if(!this.authSvc.syncIsLoggedIn){
  //     this.router.navigate(['/auth/login'])
  //   }

  //   return this.authSvc.isLoggedIn$.pipe(map(isLoggedIn => {
  //     if(!isLoggedIn) this.router.navigate(['/auth/login']);

  //     return isLoggedIn
  //   }))
  // }



  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute, state)
  }

}
