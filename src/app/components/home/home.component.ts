import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  toggleSidebar: boolean = false
  isShow: boolean = false;
  topPosToStartShowing = 100;
  userRole: string | any;
  userId: string | any;

  currentUserData: any;
  public logoutLoading: boolean = false;
  constructor(private _authService: AuthService, private router: Router) {

  }
  ngOnInit(): void {
    this.getData()
  }

  getData() {
    if (this._authService.currentUser) {
      this.currentUserData = this._authService.currentUser;
      console.log('currentUserData', this.currentUserData)
      this.userRole = this.currentUserData.role;
      this.userId =  this.currentUserData._id;

    }
    else {
      this._authService.refreshUser().pipe(
        map(user => {

          if (user) {
            this.currentUserData = user;
            console.log('user', user)
          }
        })
      );
    }



  }


  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  ontoggleSidebar() {
    this.toggleSidebar = !this.toggleSidebar
  }

  onclickToggleSidebar() {
    if (this.toggleSidebar == true) {
      this.toggleSidebar = !this.toggleSidebar
    }
  }

  onSignOut() {
    console.log('clicked onSignOut')
    this._authService.logout().subscribe(data => {
      console.log('logout successfull');
      this._authService.setuserSubjectSub(null);
      this.router.navigate(["/login"]);

    }, err => console.log(err));
  }

}
