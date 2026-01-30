
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

import { AuthService } from "./auth.service";

import { map, Observable, of } from "rxjs";
import { CanActivate, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class CookieAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  canActivate(): Observable<boolean> {
    if (!isPlatformBrowser(this.platformId))
      return of(false);
    else
      return this.authService.preloadAuth().pipe(
        map(isLoggedIn => {
          if (isLoggedIn) return true;
          else {
            this.router.navigate(['/']);
            return false;
          }
        })
      );

  }


}               