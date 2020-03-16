import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const helper = new JwtHelperService();

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    } else {
      const token = localStorage.getItem('teg-token');
      const role: string = helper.decodeToken(token).user.role;
      console.log(helper.decodeToken(token).user);
      if (role == 'EMPLOYE_SS') {
        if (route.url[0].path !== 'gerant') {
          this.router.navigate(['gerant']);
          return false;
        }
      } else
        if (role.toLowerCase() !== route.url[0].path) {
          const path = role.toLowerCase();
          this.router.navigate([path]);
          return false;
        }
    }
    return true;
  }
}
