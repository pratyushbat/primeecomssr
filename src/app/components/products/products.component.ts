import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from 'express';
import { map, shareReplay, Subject, take, takeUntil } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  userData: any;
  isLoading: boolean = false;
  products$: any;
  productList: any[] = [];
  isAddProduct = false;
  constructor(private _authService: AuthService, private _productService: ProductsService) {

  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (this._authService.currentUser) {
      this.userData = this._authService.currentUser;
      this.getProducts();
    }

    else {
      this._authService.refreshUser().pipe(
        map(user => {
          if (user)
            this.userData = user;
          this.getProducts();
        })
      );
    }

  }
  getProducts() {
    console.log('inside getProd')
    this.isLoading = true;

    this.products$ = this._productService.allproducts();
    /* .pipe(
      map((result: any) => result.data)     
    ); */

    this.products$
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe(
        (result: any) => {
          console.log('result UI', result);
          this.isLoading = false;
          this.productList = result;
          console.log(this.productList);
          /*         this._productService.setProductList(this.products$); */
        },
        (error: any) => (this.isLoading = false)
      );

  }
  refreshProducts(event: any) {
    if (event) {
      this.isAddProduct = false;
      this.getProducts();
    }
  }

  ngOnDestroy() {
    this.destroy$?.next();
    this.destroy$?.complete();

  }



}
