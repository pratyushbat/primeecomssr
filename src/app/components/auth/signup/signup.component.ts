import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  getUserLocation(): any {
    return  this._authService.getoLoaction();
  }

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
  userLocationData:any=this.getUserLocation();
  step="otp";
  constructor(private _authService: AuthService,private router:Router) { }

  ngOnInit(): void {

  }

  handelOtpSubmit() {
    this.userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phoneNumber: "91" + this.phoneNumber,
      profilePic:"",
      role:this.role,
      userLocationData:this.getUserLocation()
    
    }
    console.log(this.firstName)
    console.log(this.lastName)
    console.log(this.email)
    console.log(this.password)
    console.log(this.phoneNumber)
    console.log(this.role)
    console.log(this.userData)
    console.log(this.verificationCode)
    this.submitotp()


  }
  submitotp() {
    console.log('submit otp')
    this._authService.sendOtp("91" + this.phoneNumber, this.email).subscribe((data: any) => {
      if (data.success)
        this.step="register";
/*         console.log(data.message) */
    })
  }
  registerUser() {
    console.log('register user')
    this._authService.register("91" + this.phoneNumber, this.verificationCode, this.userData).subscribe((data: any) => {
      alert('registerd user');
         this.router.navigate(["/home"]);
    });
  }
  handelImageChange($event: Event) {
    console.log($event)
  }

}
