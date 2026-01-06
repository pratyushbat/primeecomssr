import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'primeecomssr';
  auth = inject(AuthService);

  ngOnInit(): void {

  }
  
   constructor(private _authService: AuthService) {
  
    }
}
