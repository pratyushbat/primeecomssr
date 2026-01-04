import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './imageslidercomponent.component.html',
  styleUrl: './imageslidercomponent.component.scss'
})
export class ImageslidercomponentComponent {
  intervalId: any = null;



  @Input() images: any[] = [];

  currentIndex = 0;
  constructor() {
    console.log(this.images)
  }

  startHover() {
    if (this.images.length <= 1) return;

    this.intervalId = setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.images.length;
    }, 800); // change speed (ms)
  }

  stopHover() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.currentIndex = 0; // reset to first image
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}
