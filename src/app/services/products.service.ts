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
  productById(id: string) {
    return this.http.get("/api/product/productId/" + id);
  }
  cartProductsById() {
    return this.http.get("/api/products/cart/userId", { withCredentials: true });
  }
  /* http://localhost:8000/api/lead?page=1&limit=20&status=new&search=pratyush */
  getLeads() {
    return this.http.get("/api/lead/", { withCredentials: true });
  }

  createLead(leadData: any) {
    return this.http.post("/api/lead/createLead ", leadData);
  }

}
