import { Component, ElementRef, HostBinding, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';

import { map, Observable, Subject, take, takeUntil } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { AlertService } from '../../services/alert.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  onTracked($event: string) {
    console.log('sds')
    alert('sds')
  }
  isActive: boolean = true;

  isBlocked = false;
  isReadonly: boolean = false;
  isRequired: boolean = true;
  toggleBlock() {
    this.isBlocked = !this.isBlocked;
  }
  toggleActive() {
    this.isActive = !this.isActive;
  }
  private destroy$ = new Subject<void>();
  isLoading = signal<boolean>(false);
  product: any;
  errorState = signal<string | null>(null);
  @ViewChild('usernameInput') input!: ElementRef<HTMLInputElement>;
  @ViewChild('userPara') el!: ElementRef<HTMLParagraphElement>;
  @HostBinding('attr.role') role = 'admin';
  @HostListener('click') onClick() {
    this.role = this.role === 'admin' ? 'guest' : 'admin';
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2, private elRef: ElementRef, private router: Router, private route: ActivatedRoute, private _productService: ProductsService, private _alertService: AlertService) {
  }
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const productId = params.get('productId');
      console.log(productId);
      this.getProduct(productId)
      if (!productId) {
        this.router.navigate(['/404']);
      }
    });

    this.route.queryParamMap.subscribe(params => {
      console.log(params.get('page'));
    });

    this.route.data.subscribe(data => {
      console.log(data['product']);
    });
  }


  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.input.nativeElement.focus();
    this.renderer.setStyle(
      this.input.nativeElement,
      'background-color',
      'yellow'
    );
    this.renderer.setProperty(this.input.nativeElement, 'value', 'Angular')

    /*     this.renderer.setStyle(this.el.nativeElement, 'font-size', '1.2rem');
        this.renderer.setStyle(this.el.nativeElement, 'font-weight', '600');
        this.renderer.setStyle(this.el.nativeElement, 'color', 'red'); */
    const styles = {
      color: 'red',
      'font-weight': '600',
      'font-size': '1.2rem'
    };

    Object.entries(styles).forEach(([key, value]) => {

      this.renderer.setStyle(this.el.nativeElement, key, value);
    });
    this.renderer.setAttribute(
      this.el.nativeElement,
      'style',
      ' background:black; padding:10px; border-radius:8px; cursor:pointer;'
    );

    this.renderer.setAttribute(this.el.nativeElement, 'title', 'Tooltip');
    this.renderer.addClass(this.el.nativeElement, 'active-card');
    const div = this.renderer.createElement('div');
    const text = this.renderer.createText('Hello Renderer');
    const parent = this.elRef.nativeElement;
    this.renderer.appendChild(parent, div);
    this.renderer.appendChild(div, text);

    this.renderer.listen(this.el.nativeElement, 'click', () => {
      console.log('clicked');
    });
    const comment = this.renderer.createComment('dynamic marker');
    this.renderer.appendChild(parent, comment);
  }
  getProduct(productId: string) {

    this._productService.productById(productId)
      .pipe(takeUntil(this.destroy$), map((data: any) => data.data))
      .subscribe(
        (result: any) => {

          this.isLoading.set(false);
          this.product = result;
          this._alertService.success('Product fetcehed successfully!');
        },
        (err: any) => {
          this.errorState.set(err.message);
          this.isLoading.set(false);
        }
      );
  }
}
