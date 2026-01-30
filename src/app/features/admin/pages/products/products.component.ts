import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../../../../services/cart.service';
import { AuthService } from '../../../../services/auth.service';
import { ProductsService } from '../../../../services/products.service';
import { AlertService } from '../../../../services/alert.service';



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
  constructor(private _authService: AuthService, private _cartService: CartService, private _productService: ProductsService, private _alertService: AlertService) {

  }

  ngOnInit(): void {
    this.getData();
    this.getProducts();
  }

  getData() {


    this._authService.userStatus$().subscribe(data => {
      if (data) {
        this.userData = data;
      }
      else
        this._authService.reloadData();

    });


  }
  getProducts() {
    this.isLoading = true;

    this.products$ = this._productService.allproducts();


    this.products$
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe(
        (result: any) => {
          this.isLoading = false;
          this.productList = result;
          this._alertService.success('Product received successfully!');
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
          this._alertService.success('Added to cart successfully!');
          this._cartService.updateCartMessage('Hello from Sender!');
        },
        (error: any) => (this.isLoading = false)
      );
  }

}
