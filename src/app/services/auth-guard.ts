
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
    if (this.authService.currentUser) {
      return of(true);
    }
    return this.authService.refreshUser().pipe(
      map(user => {
        if (user) return true;
        this.router.navigate(['/login']);
        return false;
      })
    );
  }

}               