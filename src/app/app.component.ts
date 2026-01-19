import { AfterViewInit, Component, EnvironmentInjector, inject, OnDestroy, OnInit, PLATFORM_ID, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ModalService } from './services/modal.service';
import { GalleryLoginComponent } from './components/extra/gallery-login/gallery-login.component';
import { isPlatformBrowser } from '@angular/common';
import { LoginComponent } from './components/auth/login/login.component';
import { Subscription } from 'rxjs';

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

  }
  constructor(private modalService: ModalService,
    private envInjector: EnvironmentInjector) { }


  ngAfterViewInit() {

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
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
