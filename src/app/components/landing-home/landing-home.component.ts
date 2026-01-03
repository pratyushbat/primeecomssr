import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrl: './landing-home.component.scss'
})
export class LandingHomeComponent {
  constructor(private meta: Meta) {
    this.meta.addTag({ name: 'description', content: "Welcome to Girisa Enterprise website, we are an MSE based out of India. We aim to deliver high-quality nails to our customers." });
    this.meta.addTag({ property: 'keywords', content: "GIRISA NAILS, buy GIRISA NAILS online, GIRISA NAILS SHOP price" });
    this.meta.addTag({ name: 'twitter-card', content: "GIRISA NAILS" });
    this.meta.addTag({ property: 'og:type', content: "website" });
    this.meta.addTag({ property: 'og:title', content: "Buy GIRISA nails  online at best prices on https://girisa.shop" });
    this.meta.addTag({ property: 'og:description', content: "Welcome to Girisa Nails Enterprise website, we are an MSE based out of India. We aim to deliver high-quality nails to our customers." });
    this.meta.addTag({ property: 'og:keywords', content: "GIRISA, buy GIRISA online, GIRISA price" });
  }

}
