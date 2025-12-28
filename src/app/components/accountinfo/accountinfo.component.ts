import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accountinfo',
  templateUrl: './accountinfo.component.html',
  styleUrl: './accountinfo.component.scss'
})
export class AccountinfoComponent implements OnInit {
  userData: any;
  public logoutLoading: boolean = false;
  constructor(private _authService: AuthService,private router:Router) {

  }
  ngOnInit(): void {
    this.getData()
  }

  getData() {
    if (this._authService.currentUser) {
      this.userData = this._authService.currentUser;
    }


    this._authService.refreshUser().pipe(
      map(user => {
        if (user)
          this.userData = user;
      })
    );
  }
  logOut() {
    console.log('clicked logout')
    this._authService.logout().subscribe(data => {
      console.log('logout successfull');
      this._authService.setuserSubjectSub(null);
          this.router.navigate(["/home"]);

    }, err => console.log(err));
  }
}

