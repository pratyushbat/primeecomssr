import { Component, Inject, Injector, OnInit, PLATFORM_ID } from '@angular/core';
import { createCustomElement } from '@angular/elements'
import { MywidgetComponent } from '../mywidget/mywidget.component';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-customelement',
  templateUrl: './customelement.component.html',
  styleUrl: './customelement.component.scss'
})
export class CustomelementComponent implements OnInit {
  constructor(private injector: Injector, @Inject(PLATFORM_ID) private platformId: Object) {
    const el = createCustomElement(MywidgetComponent, { injector });
    if (isPlatformBrowser(platformId)) {

      /* Angular Element */
      /* Angular change detection Dependency inkjectin  Logic-heavy → Angular Elements */
      customElements.define('my-widget', el);
      /* Custom Elememnt  UI only → Custom Elements*/
      customElements.define('my-button', MyButton);
    }
  }
  ngOnInit(): void {
    this.fun1();
  }
  fun1() {



  }

}
class MyButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button class="btn btn-success">Click me</button>`;
  }
}