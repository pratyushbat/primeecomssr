import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userId!: number;
  constructor() {
    console.log('profile loads dynamically', this.userId)
  }
}
