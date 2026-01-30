import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { CookieAuthGuard } from './services/auth-guard';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AccountinfoComponent } from './components/accountinfo/accountinfo.component';
import { NonCookieAuthGuard } from './services/non-auth-guard';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { HelpsupportComponent } from './components/helpsupport/helpsupport.component';
import { PaymentFailiureComponent } from './components/payments/payment-failiure/payment-failiure.component';
import { PaymentSuccessComponent } from './components/payments/payment-success/payment-success.component';
import { OrdersComponent } from './components/orders/orders.component';
import { GalleryLoginComponent } from './components/extra/gallery-login/gallery-login.component';
import { GalleryHomeComponent } from './components/extra/gallery-home/gallery-home.component';
import { PantohomeComponent } from './components/extra/panto/pantohome/pantohome.component';
import { ChooseusComponent } from './components/extra/panto/chooseus/chooseus.component';
import { CustomelementComponent } from './components/extra/customelement/customelement.component';
import { DynamicComponent } from './components/extra/dynamic/dynamic.component';
import { ShopComponent } from './components/shop/shop.component';
import { authmatchGuard } from './authmatch.guard';
import { TestcustomcvinputComponent } from './components/testcustomcvinput/testcustomcvinput.component';
import { RoleGuard } from './services/role-guard';

const routes: Routes = [
  {
    path: '', component: PantohomeComponent, data: {
      roles: ['user', 'user']
    }, canActivate: [NonCookieAuthGuard]
  },
  { path: 'shop', component: ShopComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'glogin', component: GalleryLoginComponent },
  { path: 'ghome', component: GalleryHomeComponent },
  { path: 'chooseus', component: ChooseusComponent },
  { path: 'custom', component: CustomelementComponent },
  { path: 'dynamic', component: DynamicComponent },

  { path: 'help', component: HelpsupportComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-failure', component: PaymentFailiureComponent },
  { path: 'test-custom', component: TestcustomcvinputComponent },
  {
    path: 'home', data: {
      roles: ['admin', 'user']
    }, component: HomeComponent, canActivate: [CookieAuthGuard, RoleGuard], children: [
      { path: '', redirectTo: 'products', pathMatch: "full" },
      { path: 'products', component: ShopComponent },
      { path: 'product/:productId', component: ProductComponent },
      { path: 'bag', component: CartComponent },
      { path: 'help', component: HelpsupportComponent },
      { path: 'accountinfo', component: AccountinfoComponent },
      { path: 'orders', component: OrdersComponent },

      { path: '**', redirectTo: 'products' }
    ]
  },
  {
    path: 'admin', canActivate: [CookieAuthGuard, RoleGuard], data: {
      roles: ['admin']
    }, loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule), canLoad: [authmatchGuard]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
