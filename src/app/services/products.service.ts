import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  createProduct(products: any) {
    return this.http.post("/api/product/create ", products, { withCredentials: true });
  }
  
  allproducts() {
    return this.http.get("/api/product/all").pipe(shareReplay(1));;
  }
  productById() {
    return this.http.get("/api/productsById");
  }
  cartProductsById() {
    return this.http.get("/api/products/cart/userId", { withCredentials: true });
  }


}
