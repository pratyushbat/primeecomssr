import { afterNextRender, Component, computed, effect, inject, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { GalleryLoginComponent } from '../../gallery-login/gallery-login.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-pheader',
  templateUrl: './pheader.component.html',
  styleUrl: './pheader.component.scss'
})
export class PheaderComponent implements OnInit, OnDestroy {


  navLinks = [
    { label: 'Home', path: '' },
    { label: 'Shop', path: '/shop' },
    { label: 'Help', path: '/help' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contactus' },


  ];

  /*   isHeaderScrolled = signal<boolean>(false); */
  // ✅ derived state
  scrollY = signal(0);
  isHeaderScrolled = computed(() => this.scrollY() > 0);

  currentPath = signal("");
  relaod: boolean = true;


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private modalSvc: ModalService, private zone: NgZone) {
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
  ngOnInit(): void {
  }



  ngOnDestroy(): void {

    if (isPlatformBrowser(this.platformId))
      document.removeEventListener('scroll', this.onScroll);

  }

  gologin(type: string) {
    this.modalSvc.openloginOrSignup(type);
  }
}
