import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { CookieAuthGuard } from './services/auth-guard';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AccountinfoComponent } from './components/accountinfo/accountinfo.component';
import { NonCookieAuthGuard } from './services/non-auth-guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NonCookieAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NonCookieAuthGuard] },
  {
    path: 'home', component: HomeComponent, canActivate: [CookieAuthGuard], children: [
      { path: 'accountinfo', component: AccountinfoComponent },
      { path: 'contactus', component: ContactusComponent },
      { path: '', redirectTo: 'accountinfo', pathMatch: "full" },
      { path: '**', redirectTo: 'accountinfo' }
    ]
  },


  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
