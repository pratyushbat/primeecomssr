import { AfterViewInit, Component, EnvironmentInjector, inject, OnDestroy, OnInit, PLATFORM_ID, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ModalService } from './services/modal.service';
import { GalleryLoginComponent } from './components/extra/gallery-login/gallery-login.component';
import { isPlatformBrowser } from '@angular/common';
import { LoginComponent } from './components/auth/login/login.component';
import { Subscription } from 'rxjs';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {


  private platformId = inject(PLATFORM_ID);
  title = 'primeecomssr';
  auth = inject(AuthService);


  @ViewChild('modalHost', { read: ViewContainerRef })
  modalHost!: ViewContainerRef;

  private sub = new Subscription();

  ngOnInit(): void {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator and perform an action
        this._alertService.success("Show loading indicator and perform an action  NavigationStart")
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator and perform an action
        this._alertService.success("Hide loading indicator and perform an action  NavigationEnd")
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator and perform an action
        console.log(event.error); // It logs an error for debugging
        this._alertService.success(" It logs an error for debugging" + event.error)
      }
    });

  }
  constructor(private modalService: ModalService,
    private envInjector: EnvironmentInjector, private router: Router, private _alertService: AlertService) { }


  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // OPEN
    this.sub.add(
      this.modalService.openRequests$.subscribe(component => {
        this.openModal(component)
      })
    );

    // CLOSE
    this.sub.add(
      this.modalService.closeRequests$.subscribe(() => {
        this.modalHost.clear();
      })
    );
  }

  openModal(ctmcomponent: any) {
    if (!isPlatformBrowser(this.platformId)) return;


    this.modalService.open(
      this.modalHost,
      ctmcomponent,
      this.envInjector
    );

  }
  closeModal() {
    this.modalService.close();
  }

  ontoggleSidebar($event: any) {
    console.log('togglingh sidebare in app.ts 67')
    this.modalService.toggleSidebar(true);
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
