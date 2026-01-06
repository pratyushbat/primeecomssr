import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "./auth.service";

import { catchError, map, Observable, of } from "rxjs";
import { CanActivate, Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class NonCookieAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    if (!this.authService.currentUser) {
      return of(true);
    }


    // 2️⃣ Otherwise refresh from backend
    return this.authService.refreshUser().pipe(
      map(user => {
        console.log('user inside non auth',user)
        if (this.authService.loading()) {
          return false;
        }

        if (!user) return true;
        else{

          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }

}               