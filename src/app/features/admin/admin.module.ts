import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    CreateProductComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule

  ]
})
export class AdminModule { }
