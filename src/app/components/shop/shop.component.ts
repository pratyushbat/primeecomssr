import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';

import { skeletonCards } from '../../util/skeletonCard';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { AlertService } from '../../services/alert.service';
type sortValue = Pick<ProductsFilters, 'sort'>;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {


  private destroy$ = new Subject<void>();
  userData: any;

  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  currentPage = signal<number>(1);
  featuredProducts = signal<any[]>([]);
  productsCount = signal<number>(0);
  totalPages = signal<number>(0);
  products$: any;


  productsLimit = 8;
  skeletonCards = skeletonCards(this.productsLimit);
  selectedSort = signal<ProductsFilters['sort'] | ''>('');
  sortFilters: { label: string; value: sortValue['sort'] }[] = [
    { label: 'Price Ascending', value: 'price_asc' },
    { label: 'Price Descending', value: 'price_desc' },
    { label: 'Name Ascending', value: 'name_asc' },
    { label: 'Name Descending', value: 'name_desc' },
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
  ];
  private platformId = inject(PLATFORM_ID);
  constructor(private _authService: AuthService, private _cartService: CartService, private _productService: ProductsService, private _alertService: AlertService) {
    if (!isPlatformBrowser(this.platformId)) return;
    this.getProducts();
  }

  ngOnInit(): void {



  }

  onChange(event: Event) {
    const eventTarget = event.target as HTMLSelectElement;

    let value = eventTarget.value;

    this.selectedSort.set(value as sortValue['sort']);
  }

  getProducts() {
    /*  effect(() => { */
    this.isLoading.set(true);
    this.errorState.set(null);
    this.products$ = this._productService.allproducts();


    this.products$
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe(
        (result: any) => {
          if (Array.isArray(result) && result.length > 0) {

            this.isLoading.set(false);
            this.featuredProducts.set(result);
            this._alertService.success('Product received successfully!');
          }
        },
        (err: any) => {
          this.errorState.set(err.message);
          this.isLoading.set(false);
        }
      );
    /*    }) */
  }



  ngOnDestroy() {
    this.destroy$?.next();
    this.destroy$?.complete();

  }

  addToCart(product: any) {
    this.isLoading.set(true);
    this._cartService.addToCart({ productId: product._id, quantity: 1 })
      .subscribe(
        (result: any) => {
          console.log(this.selectedSort())
          this.isLoading.set(false);
          this._alertService.success('Added to cart successfully!');
          this._cartService.updateCartMessage('Hello from Sender!');
        },
        (error: any) => (this.isLoading.set(false))
      );
  }
  goToPrevPage() {
    if (this.currentPage() > 1) this.currentPage.update((prev) => prev - 1);
  }
  goToNextPage() {
    if (this.currentPage() < this.totalPages())
      this.currentPage.update((prev) => prev + 1);
  }
}


export interface ProductsFilters {
  limit: number;
  offset: number;
  sort:
  | 'price_asc'
  | 'price_desc'
  | 'name_asc'
  | 'name_desc'
  | 'newest'
  | 'oldest';

  min_price: number;
  max_price: number;
  min_stock: number;
  max_stock: number;
  featured: boolean;
}
