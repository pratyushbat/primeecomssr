import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "./auth.service";

import { catchError, map, Observable, of } from "rxjs";
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

    /* return this.authService.logUserData().pipe(
      map((res:any) => {
        if (res.success) {
          this.authService.setuserSubjectSub(res.userData);
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    ); */

    // 2️⃣ Otherwise refresh from backend
    return this.authService.refreshUser().pipe(
      map(user => {
        if (user) return true;
        this.router.navigate(['/login']);
        return false;
      })
    );
  }

}               