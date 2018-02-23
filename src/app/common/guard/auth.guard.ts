import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot ,Router } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (localStorage.getItem("identity")) {
      return true;
    }
    this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
    return false;
  }
}
