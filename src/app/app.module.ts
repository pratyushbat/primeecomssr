import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpHandlerFn, HttpInterceptorFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AccountinfoComponent } from './components/accountinfo/accountinfo.component';
import { AuthService } from './services/auth.service';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductComponent } from './components/product/product.component';
import { ImageslidercomponentComponent } from './components/common/imageslidercomponent/imageslidercomponent.component';
import { CartComponent } from './components/cart/cart.component';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
const AUTH_EXCLUDED_URLS = [
  '/api/login',
  '/api/register',
  '/api/refresh',
  '/api/logout',
];
export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const tokenCP = authService.getUrlClientProd();
  const router = inject(Router);
  if (!req.url.startsWith('/api') || req.url.includes('.')) 
    return next(req);
  
  const apiReq = req.clone({
    setHeaders: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
    url: `${tokenCP}${req.url}`,
    withCredentials: true
  });

  return next(apiReq).pipe(
    catchError(err => {
      /*  const isExcluded = AUTH_EXCLUDED_URLS.some(url =>
         router.url.includes(url)
      ); */
/*       && !isExcluded */
      if (err.status === 401  ) {
        alert('unquthorized now get out'+req.url);
        authService.setuserSubjectSub(null);
        router.navigate(['/login']);// 🔥 auto logout
      }
      return throwError(() => err);
    })
  );
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ContactusComponent,
    AccountinfoComponent,
    LandingHomeComponent,
    ProductsComponent,
    CreateProductComponent,
    ProductComponent,
    ImageslidercomponentComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([apiInterceptor])
    ),
    CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: AuthService) => () => auth.refreshUser().toPromise(),
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
