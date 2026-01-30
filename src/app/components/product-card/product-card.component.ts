import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { CartService } from '../../services/cart.service';
import { AlertService } from '../../services/alert.service';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  @Input()
  currentUserData: any;

  product = input.required<any>();
  isLoading: boolean = false;

  constructor(private modalSvc: ModalService, private _cartService: CartService, private _alertService: AlertService) {

  }
  ngOnInit(): void {

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
  productsStars(starsLength: number) {
    return Array.from({ length: starsLength }, (_, index) => index);
  }
  isFavorite(productId: string): boolean {
    return false;
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/6ee0c674-e6e3-4509-b009-ec9650f2ed5f.jpeg';
  }

  gologinSignup(type: string) {
    if (type === 'login')
      this.modalSvc.requestOpen(LoginComponent);
    else if (type === 'signup')
      this.modalSvc.requestOpen(SignupComponent);
  }

  showAlert() {
    console.log('this.product.name', this.product.name)
  }
}
