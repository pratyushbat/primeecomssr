import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { CookieAuthGuard } from './services/auth-guard';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AccountinfoComponent } from './components/accountinfo/accountinfo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, },
  {path: 'contactus', component: ContactusComponent,canActivate:[CookieAuthGuard],},
    {path: 'accountinfo', component: AccountinfoComponent,canActivate:[CookieAuthGuard],},
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
