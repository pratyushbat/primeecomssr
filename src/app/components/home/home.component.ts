import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { map, Subject, take, takeUntil } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { CartService } from '../../services/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  toggleSidebar: boolean = false
  isShow: boolean = false;
  topPosToStartShowing = 100;
  userRole: string | any;
  userId: string | any;

  currentUserData: any;
  isLoading: boolean = false;
  cartLength: number = 0;

  constructor(private _authService: AuthService, private router: Router, private meta: Meta, private _cartService: CartService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.meta.addTag({ name: 'description', content: "We are Girisa Nails, we are an MSE based out of India. We aim to deliver high-quality nails to our customers." });
    this.meta.addTag({ property: 'keywords', content: "nails, girisa nails,buy affordable nails, online nails store, modern nails, GIRISA NAILS, buy GIRISA NAILS online, GIRISA NAILS SHOP price" });
    this.meta.addTag({ name: 'twitter-card', content: "GIRISA NAILS" });
    this.meta.addTag({ property: 'og:type', content: "website" });
    this.meta.addTag({ property: 'og:title', content: "Buy GIRISA nails  online at best prices on https://girisa.shop" });
    this.meta.addTag({ property: 'og:description', content: "Welcome to Girisa Nails Enterprise website, we are an MSE based out of India. We aim to deliver high-quality nails to our customers." });
    this.meta.addTag({ property: 'og:keywords', content: "nails, girisa nails,buy affordable nails, online nails store, modern nails,  ,GIRISA Nails, buy GIRISA nails online, GIRISA nails price" });
  }
  ngOnInit(): void {
    this._cartService.currentCartMessage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(msg => {
        this.getCount();
      });
    this.getData();

  }

  getData() {

    this._authService.userStatus$().subscribe(data => {
      if (data) {
        this.currentUserData = data;
        this.userRole = this.currentUserData.role;
        this.userId = this.currentUserData._id;
        this.getCount();
      }
      else
        this._authService.reloadData();

    });

  }


  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    if (isPlatformBrowser(this.platformId))
      window?.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
  }
  ontoggleSidebar() {
    this.toggleSidebar = !this.toggleSidebar
  }

  onclickToggleSidebar() {
    if (this.toggleSidebar == true) {
      this.toggleSidebar = !this.toggleSidebar
    }
  }

  onSignOut() {

    this._authService.logout().subscribe(data => {
      this.logOutUI();

    }, err => this.logOutUI());
  }
  logOutUI() {
    this._authService.setuserSubjectSub(null);
    this.router.navigate(["/login"]);
  }

  getCount() {
    this.isLoading = true;
    this.cartLength = 0;
    this._cartService.getCart()
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe(
        (result: any) => {

          this.cartLength = result?.items?.length;
          console.log('this.cartLength', this.cartLength)
          this.isLoading = false;
        },
        (error: any) => (this.isLoading = false)
      );

  }

  ngOnDestroy() {
    this.destroy$?.next();
    this.destroy$?.complete();

  }
}
