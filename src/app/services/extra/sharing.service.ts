import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProductsService } from '../products.service';


@Injectable({
    providedIn: 'root'
})
export class SharingService {

    constructor(private _authService: AuthService, private Router: Router, private _productsService: ProductsService) { }
    private userData = new BehaviorSubject<any>([]);
    currentUserData = this.userData.asObservable();

    private products = new BehaviorSubject<any>([]);
    currentProducts = this.products.asObservable();


    updateUserData() {
        return of(true);
        /*  if (localStorage.getItem('userToken')) {
             this._authService.getUserData(localStorage.getItem('userToken')).subscribe(
                 (data: any) => {
 
                     if (data.userData) {
                         this.userData.next(data.userData);
                     }
                 },
                 (err: HttpErrorResponse) => {
                     console.log(err);
 
                     if (
                         err.error.message == 'jwt expired' ||
                         err.error.message == 'jwt malformed'
                     ) {
                         localStorage.removeItem('userToken');
                         this.Router.navigate([`/register`]);
                     }
                 }
             );
         } */
    }

    updateProducts() {
        this._productsService.allproducts().subscribe((data: any) => {
            this.products.next(data);
        },
            (err: HttpErrorResponse) => {
                console.log(err);
            })
    }

    clearData() {
        this.userData.next('');
    }
}