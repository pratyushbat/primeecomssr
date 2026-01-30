import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { AlertService } from '../../services/alert.service';
import { skeletonCards } from '../../util/skeletonCard';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss'
})
export class FeaturedProductsComponent {


  private destroy$ = new Subject<void>();
  userData: any;

  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  featuredProducts = signal<any[]>([]);
  products$: any;


  productsLimit = 8;
  skeletonCards = skeletonCards(this.productsLimit);

  private platformId = inject(PLATFORM_ID);
  constructor(private _authService: AuthService, private _cartService: CartService, private _productService: ProductsService, private _alertService: AlertService) {
    if (!isPlatformBrowser(this.platformId)) return;
    this.getProducts();
  }

  ngOnInit(): void {

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
            /*   this._alertService.success('Product received successfully!'); */
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
          this.isLoading.set(false);
          this._alertService.success('Added to cart successfully!');
          this._cartService.updateCartMessage('Hello from Sender!');
        },
        (error: any) => (this.isLoading.set(false))
      );
  }

}
