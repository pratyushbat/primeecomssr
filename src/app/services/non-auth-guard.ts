import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "./auth.service";

import { catchError, map, Observable, of, take } from "rxjs";
import { CanActivate, Router } from "@angular/router";
import { error } from "node:console";

@Injectable({ providedIn: 'root' })
export class NonCookieAuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {


    return this._authService.authStatus$().pipe(
      take(1),
      map(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/home']);
          return false;
        }
        else
          return true;
      })
    );
  }

}               