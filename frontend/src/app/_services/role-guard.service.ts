import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const userItem = sessionStorage.getItem('auth-user')
    let user;
    if(userItem){
        user = JSON.parse(userItem) as any;
    }
    if ( user &&
        !user.roles.some((role: any) => expectedRole.includes(role))
    ) {
      this.router.navigate(['user']);
      return false;
    }
    return true;
  }
}