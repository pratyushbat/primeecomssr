import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from 'express';
import { map, shareReplay, Subject, take, takeUntil } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

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
  constructor(private _authService: AuthService, private _cartService: CartService, private _productService: ProductsService) {

  }

  ngOnInit(): void {
    this.getData();
     this.getProducts();
  }

  getData() {
    if (this._authService.currentUser) {
      this.userData = this._authService.currentUser;
     
    }

    else {
      this._authService.refreshUser().pipe(
        map(user => {
          if (user)
            this.userData = user;
        })
      );
    }

  }
  getProducts() {
    this.isLoading = true;

    this.products$ = this._productService.allproducts();
    /* .pipe(
      map((result: any) => result.data)     
    ); */

    this.products$
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe(
        (result: any) => {
          this.isLoading = false;
          this.productList = result;
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

  addToCart(product: any) {
    this.isLoading = true;
    this._cartService.addToCart({ productId: product._id, quantity: 1 })
      .subscribe(
        (result: any) => {
          this.isLoading = false;
           this._cartService.updateCartMessage('Hello from Sender!');
        },
        (error: any) => (this.isLoading = false)
      );
  }

}
