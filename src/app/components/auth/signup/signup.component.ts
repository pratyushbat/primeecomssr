import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();



  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  isPasswordHidden: boolean = true;
  countryCode: string = "";
  phoneNumber: string = "";
  verificationCode: string = "";
  role: string = "";
  loading: boolean = false;
  userData: any;
  userLocationData: any = this.getUserLocation();
  step = "otp";

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  handelOtpSubmit() {
    this.userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phoneNumber: "91" + this.phoneNumber,
      profilePic: "",
      role: this.role,
      userLocationData: this.getUserLocation()

    }

    this.submitotp()


  }
  submitotp() {

    this._authService.sendOtp("91" + this.phoneNumber, this.email)
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe((data: any) => {
        if (data.success)
          this.step = "register";
      })
  }
  registerUser() {
    this._authService.register("91" + this.phoneNumber, this.verificationCode, this.userData)
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe((data: any) => {
        alert('registerd user');
        this.router.navigate(["/home"]);
      });
  }
  handelImageChange($event: Event) {
    console.log($event)
  }
  getUserLocation(): any {
    return this._authService.getoLoaction();
  }
  ngOnDestroy() {
    this.destroy$?.next();
    this.destroy$?.complete();

  }
}
