import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  product = input.required<any>();

  productsStars(starsLength: number) {
    return Array.from({ length: starsLength }, (_, index) => index);
  }
  isFavorite(productId: string): boolean {
    return false;
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/6ee0c674-e6e3-4509-b009-ec9650f2ed5f.jpeg';
  }
}
