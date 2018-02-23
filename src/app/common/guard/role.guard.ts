import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router/src/interfaces";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RoleGuard implements CanActivate {
  public identity;
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // console.log("probando el guard")
    if (localStorage.getItem("identity")) {
      console.log(localStorage.getItem("identity"));
      this.identity = JSON.parse(localStorage.getItem("identity"));
      console.log(localStorage.getItem("identity"));
      if (this.identity.rol === "ADMIN"){
        return true;
      } 
      // return this.identity.rol === "ADMIN" ? true : false;
      // return true;
    }
    this.router.navigate(["/reclamos"]);
    return false;
  }
}
