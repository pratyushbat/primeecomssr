
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

import { AuthService } from "./auth.service";

import { map, Observable, of } from "rxjs";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }





  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!isPlatformBrowser(this.platformId))
      return false;
    else {
      const roles = route.data['roles'] as string[];
      console.log(roles)
      console.log(this.auth.hasAnyRole(roles))
      if (!roles || this.auth.hasAnyRole(roles)) {
        return true;
      }
      else {
        this.router.navigate(['/']);
        return false;
      }
    }

  }
}               