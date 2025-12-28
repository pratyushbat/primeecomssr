import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'primeecomssr';

  ngOnInit(): void {

  }
  
   constructor(private _authService: AuthService) {
  
    }
}
