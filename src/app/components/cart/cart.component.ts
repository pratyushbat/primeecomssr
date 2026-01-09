import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subject, take, takeUntil } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {

  cart: any;
  loading = true;
  private destroy$ = new Subject<void>();
  constructor(private cartService: CartService, private _alertService: AlertService) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart()
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe(res => {
        this.cart = res;
        this.loading = false;
      });
  }

  updateQty(productId: string, qty: number) {
    if (qty < 1) return;
    this.cartService.updateCart({ productId, qty }).subscribe(() => this.loadCart());
  }

  remove(productId: string) {
    this.cartService.removeFromCart(productId).subscribe(() => this.loadCart());
  }

  getTotal() {
    return this.cart?.items.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity,
      0
    );
  }

  createOrderAndMakePayment() {
    this.cartService.createOrderFromCart().subscribe((res: any) => {

      this._alertService.success('Order Created Successfully' + res.orderId)
      if (res.msg === "OK")
        this.redirectToExternal(res.url)
    }
    );
  }

  /*  makePayment() {
     this.cartService.makePayment({
       name: "praty chazz",
       mobileNumber: 9999910089,
       amount: 100,
       orderId:
     }).subscribe((res: any) => {
         if (res.msg === "OK")
           this.redirectToExternal(res.url)
         this._alertService.success('Logout successfully!')
       }
       );
   }
  */
  redirectToExternal(url: string) {
    window.location.href = url;
  }

  ngOnDestroy() {
    this.destroy$?.next();
    this.destroy$?.complete();

  }
}
