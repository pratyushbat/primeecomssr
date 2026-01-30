import { afterNextRender, ChangeDetectorRef, Component, computed, effect, EventEmitter, inject, Inject, NgZone, OnDestroy, OnInit, Output, PLATFORM_ID, signal } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../services/alert.service';
import { CartService } from '../../../../services/cart.service';
import { Subject, take, takeUntil } from 'rxjs';


@Component({
  selector: 'app-pheader',
  templateUrl: './pheader.component.html',
  styleUrl: './pheader.component.scss'
})
export class PheaderComponent implements OnInit, OnDestroy {
  cartLength: number = 0;
  toggleSidebar: boolean = false;
  isLoading: boolean;
  private destroy$ = new Subject<void>();
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


  @Output() onToggle: EventEmitter<any> = new EventEmitter();

  ontoggleSidebar() {

    this.toggleSidebar = !this.toggleSidebar
    this.onToggle.emit(this.toggleSidebar)
  }


  navLinks = [



  ];

  /*   isHeaderScrolled = signal<boolean>(false); */
  // ✅ derived state
  scrollY = signal(0);
  isHeaderScrolled = computed(() => this.scrollY() > 0);

  currentPath = signal("");
  relaod: boolean = true;

  currentUser: any;
  isLoadingUser = signal<boolean>(true);

  constructor(private authService: AuthService, private _alertService: AlertService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private modalSvc: ModalService, private zone: NgZone, private cdr: ChangeDetectorRef, private _cartService: CartService) {
    /*  if (!isPlatformBrowser(this.platformId)) return;
     afterNextRender(() => {
       if (isPlatformBrowser(this.platformId)) {
         this.currentPath.set(window?.location.pathname);
         document.addEventListener('scroll', this.onScroll, { passive: true });
       } 
  });*/

  }




  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setLoginUser();


    }
  }
  setLoginUser() {
    /*    this.currentUser = this.authService.currentUser;
       console.log(this.currentUser, ' this.currentUser')
    */


    this.authService.userStatus$().subscribe(data => {
      if (data) {

        this.isLoadingUser.set(true)
        this.currentUser = this.authService.currentUser;
        this.getCount();
        this.navLinks = [
          { label: 'Home', path: '' },
          { label: 'Account ', path: '/home/accountinfo' },
          { label: 'Admin ', path: '/admin' },

        ]
      }
      else {
        this.navLinks = [
          { label: 'Home', path: '' },
          { label: 'Shop', path: '/shop' },
          { label: 'Help', path: '/help' },
          { label: 'About Us', path: '/about' },
          { label: 'Contact', path: '/contactus' },
        ]
        this.isLoadingUser.set(false)
      }


    }, err => {
      this.navLinks = [
        { label: 'Home', path: '' },
        { label: 'Shop', path: '/shop' },
        { label: 'Help', path: '/help' },
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contactus' },
      ]
      this.isLoadingUser.set(false)

    });
  }

  onSignOut() {

    this.authService.logout().subscribe(data => {
      this.logOutUI();

    }, err => this.logOutUI());
  }
  logOutUI() {
    this.authService.setuserSubjectSub(null);
    this._alertService.error('Please fill all fields and select images');
    this.router.navigate(["/"]);
  }



  ngOnDestroy(): void {



  }

  gologin(type: string) {
    this.modalSvc.openloginOrSignup(type);
  }
}
