import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    private cartmessageSource = new BehaviorSubject<string>('default message');
  currentCartMessage$ = this.cartmessageSource.asObservable();
  
  url: string = "http://localhost:8000/api";
  constructor(private http: HttpClient) { }

  addToCart(cartObj: any) {
    return this.http.post(this.url + "/cart/addToCart ", cartObj, { withCredentials: true });
  }

  getCart() {
    return this.http.get(this.url + "/cart/getCart").pipe(shareReplay(1));;
  }

  updateCart(cartObj:any) {
     return this.http.patch(this.url + "/updateCart",cartObj, { withCredentials: true });
  }

  removeFromCart(productId:any) {
    return this.http.delete(`${this.url}/removeFromCart/${productId}`, { withCredentials: true });
  }

  updateCartMessage(message: string) {
    this.cartmessageSource.next(message);
  }

}
