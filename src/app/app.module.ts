import { APP_INITIALIZER, NgModule } from '@angular/core';
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

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  // Include the `apiUrl` in your environment, like `//localhost:3000`
  if (req.url.includes("/api")) {
    req = req.clone({ withCredentials: true });
  }
  return next(req);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ContactusComponent,
    AccountinfoComponent
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
