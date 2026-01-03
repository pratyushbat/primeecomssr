import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  /*   url: string = "https://girisa.shop/api"; */
  url: string = "http://localhost:8000/api";

  constructor(private http: HttpClient) { }

  createProduct(products: any) {
    return this.http.post(this.url + "/product/create ", products, { withCredentials: true });
  }
  
  allproducts() {
    return this.http.get(this.url + "/product/all")  .pipe(shareReplay(1));;
  }
  productById() {
    return this.http.get(this.url + "/productsById");
  }
  cartProductsById() {
    return this.http.get(this.url + "/products/cart/userId", { withCredentials: true });
  }


}
