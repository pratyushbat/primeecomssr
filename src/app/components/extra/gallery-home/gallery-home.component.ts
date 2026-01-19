
import { Component, HostListener, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { OwlModule } from 'ngx-owl-carousel';
import { SharingService } from '../../../services/extra/sharing.service';
import { AuthService } from '../../../services/auth.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  styleUrl: './gallery-home.component.scss'
})
export class GalleryHomeComponent {
  constructor(private ElementRef: ElementRef, private SharingService: SharingService, private AuthService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) { }
  logged: Boolean = false
  messageErr: String = ''
  message: String = ''
  userData: any
  sended: Boolean = false


  carouselOptions = {
    items: 3,
    dots: true,
    navigation: true
  };

  carouselData = [
    { title: 'Slide 1', content: 'Lorem ipsum dolor sit amet.' },
    { title: 'Slide 2', content: 'Consectetur adipiscing elit.' },
    { title: 'Slide 3', content: 'Sed do eiusmod tempor incididunt ut labore.' }
  ];

  ngOnInit(): void {
    this.reveal();
    // this.swatch();
    this.SharingService.updateProducts()
    this.SharingService.updateUserData()
    this.SharingService.currentUserData.subscribe((data: any) => {
      this.userData = data
    })

    if (isPlatformBrowser(this.platformId) && localStorage.getItem("userToken")) {
      this.logged = true
    } else {
      this.logged = false
    }
  }

  //   swatch() {


  //     let text = this.ElementRef.nativeElement.querySelector('#text').innerHTML;

  // setTimeout(() => {
  //   this.ElementRef.nativeElement.querySelector('#text').classList.add('hide')
  // setTimeout(() => {
  //   this.ElementRef.nativeElement.querySelector('#text').classList.remove('hide')
  //   if (text == this.name) {
  //     this.ElementRef.nativeElement.querySelector('#text').innerHTML =
  //       this.job;
  //   } else {
  //     this.ElementRef.nativeElement.querySelector('#text').innerHTML =
  //       this.name;
  //   }
  //   this.swatch()
  // }, 500);
  //     }, 6000);
  //   }

  reveal() {

    if (isPlatformBrowser(this.platformId)) {

      var reveals = document.querySelectorAll('.reveal');

      for (var i = 0; i < reveals?.length; i++) {
        var windowHeight = window?.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        } else {
          reveals[i].classList.remove('active');
        }
      }
    }
  }
  isLogged() {
    if (!this.logged) {

      this.messageErr = 'يلزم تسجيل الدخول اولا'
    } else {
      this.messageErr = ''
    }
  }
  sendMessage() {
    let data = {
      message: this.message,
      email: this.userData.email
    }

    this.AuthService.sendMessage(data).subscribe((data: any) => {

      if (data.message == 'sended') {
        this.sended = true
        setTimeout(() => {
          this.sended = false

        }, 3000);
        this.message = ''
      }
    })
  }
}
