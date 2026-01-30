import { afterNextRender, Component, computed, EventEmitter, Inject, NgZone, OnDestroy, OnInit, Output, PLATFORM_ID, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { CartService } from '../../services/cart.service';
import { Subject, take, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  currentUserData: any;
  toggleSidebar: boolean = false;
  userRole: string | any;
  userId: string | any;
  isLoading: boolean = false;
  cartLength: number = 0;

  @Output() onToggle: EventEmitter<any> = new EventEmitter();

  scrollY = signal(0);
  isHeaderScrolled = computed(() => this.scrollY() > 0);
  currentPath = signal("");
  isLoadingUser = signal<boolean>(true);
  constructor(private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object, private _authService: AuthService, private router: Router, private _cartService: CartService,) {
    if (!isPlatformBrowser(this.platformId)) return;
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.currentPath.set(window?.location.pathname);
        document.addEventListener('scroll', this.onScroll, { passive: true });
      }
    });
  }

  private onScroll = (e: Event) => {
    const y =
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    // ✅ Re-enter Angular zone
    this.zone.run(() => {
      this.scrollY.set(y);
    });

  };


  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId))
      document.removeEventListener('scroll', this.onScroll);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
      this.getData()
  }
  ontoggleSidebar(event?: any) {
    this.onToggle.emit(this.toggleSidebar)
    this.toggleSidebar = !this.toggleSidebar
  }

  getData() {
    this._authService.userStatus$().subscribe(data => {
      if (data) {
        this.currentUserData = this._authService.currentUser;
        this.userRole = this.currentUserData.role;
        this.userId = this.currentUserData._id;
        this.getCount();
      }
      else
        this._authService.reloadData();

    });

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



  onSignOut() {

    this._authService.logout().subscribe(data => {
      this.logOutUI();

    }, err => this.logOutUI());
  }

  logOutUI() {
    this._authService.setuserSubjectSub(null);
    this.router.navigate(["/login"]);
  }
}
