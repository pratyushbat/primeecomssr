
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

import { map, Observable, of } from "rxjs";
import { CanActivate, Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class CookieAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.preloadAuth().pipe(
      map(isLoggedIn => {
        if (isLoggedIn) return true;
        this.router.navigate(['/']);
        return false;
      })
    );

  }


}               