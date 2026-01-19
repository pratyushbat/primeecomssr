import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private cartmessageSource = new BehaviorSubject<string>('default message');
  currentCartMessage$ = this.cartmessageSource.asObservable();

  constructor(private http: HttpClient) { }

  addToCart(cartObj: any) {
    return this.http.post("/api/cart/addToCart ", cartObj, { withCredentials: true });
  }

  getCart() {
    return this.http.get("/api/cart/getCart").pipe(shareReplay(1));;
  }

  updateCart(cartObj: any) {
    return this.http.patch("/api/updateCart", cartObj, { withCredentials: true });
  }

  removeFromCart(productId: any) {
    return this.http.delete(`/api/removeFromCart/${productId}`, { withCredentials: true });
  }

  updateCartMessage(message: string) {
    this.cartmessageSource.next(message);
  }
  makePayment(payObj: any) {
    return this.http.post("/api/payment/create-order ", payObj, { withCredentials: true });
  }
  createOrderFromCart() {
    return this.http.post("/api/order/cartToOrder", {}, { withCredentials: true });
  }
  allOrders() {
    return this.http.get("/api/order/all", { withCredentials: true });
  }
}
