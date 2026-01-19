import { Component } from '@angular/core';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrl: './dynamic.component.scss'
})
export class DynamicComponent {
  @ViewChild('host', { read: ViewContainerRef })
  vcr!: ViewContainerRef;

  loadComponent() {
    this.vcr.clear();
    const compRef: any = this.vcr.createComponent(ProfileComponent);
    compRef.instance.userId = 10;
  }
}
