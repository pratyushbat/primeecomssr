import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { CookieAuthGuard } from './services/auth-guard';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AccountinfoComponent } from './components/accountinfo/accountinfo.component';
import { NonCookieAuthGuard } from './services/non-auth-guard';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { HelpsupportComponent } from './components/helpsupport/helpsupport.component';
import { PaymentFailiureComponent } from './components/payments/payment-failiure/payment-failiure.component';
import { PaymentSuccessComponent } from './components/payments/payment-success/payment-success.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  { path: '', component: LandingHomeComponent, canActivate: [NonCookieAuthGuard] },
  { path: 'contactus', component: ContactusComponent },
  { path: 'help', component: HelpsupportComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-failure', component: PaymentFailiureComponent },
  { path: 'login', component: LoginComponent, canActivate: [NonCookieAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NonCookieAuthGuard] },
  {
    path: 'home', component: HomeComponent, canActivate: [CookieAuthGuard], children: [
      { path: 'products', component: ProductsComponent },
      { path: 'product/:productId', component: ProductComponent },
      { path: 'bag', component: CartComponent },
      { path: 'help', component: HelpsupportComponent },
      { path: 'accountinfo', component: AccountinfoComponent },
      { path: 'orders', component: OrdersComponent },
      { path: '', redirectTo: 'products', pathMatch: "full" },
      { path: '**', redirectTo: 'products' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
