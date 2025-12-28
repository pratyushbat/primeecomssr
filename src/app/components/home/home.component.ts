import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private _authService: AuthService, private router: Router, private cookieService: CookieService) {

  }
  ngOnInit(): void {
    this._authService.userSubjectSub.subscribe(data=>console.log(data));
    console.log('user direct', this._authService.user)
    console.log('from observable')
    this._authService.userObs.subscribe(data => console.log(data), err => console.log(err));
    console.log(this.cookieService.get("jwtAutToken"))
  /*   console.log(document.cookie) */
    console.log('jwtAutToken', this.cookieService.get("jwtAutToken"))
    this.cookieService.set( 'Test', 'Hello World' );
   
   console.log(this.cookieService.get('Test'))
   console.log(this.cookieService.get('jwtAutToken'))
  /*  const cookies = document.cookie;
console.log(cookies); */
  }
}
