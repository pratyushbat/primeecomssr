import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


const validatePassword = (password: any) => {
  const regexForPassword = /[A-Za-z\d]{5,}/;
  const isValid = regexForPassword.test(password);
  return isValid;
};



const validateEmail = (email: any) => {
  const regexForEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const isValid = regexForEmail.test(email);
  return isValid;
};

const validateName = (value: any) => {
  const nameRegex = /^[^\s]+$/;
  const isValid = nameRegex.test(value);
  return isValid;
};

const validatePhoneNumber = (phoneNumber: any) => {
  const phoneRegex = /^\d{10}$/;
  const isValid = phoneRegex.test(phoneNumber);
  return isValid;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  countryCode = "91";
  phoneNumber = "";
  isPasswordHidden = false;
  loading = false;
  password = "";


  constructor(private _authService: AuthService,private router:Router) {

  }
  ngOnInit(): void {
    
  }

  setCounterCode(arg: any) {
    console.log(arg)
  }

  submitLogin() {

    const isPasswordValid = validatePassword(this.password);
    const isValidPhoneNumber = validatePhoneNumber(this.phoneNumber);

    if (!isPasswordValid) {
      alert("Password At Least 5 Character Avoid Speacial Symbol..!!");
    } else if (!isValidPhoneNumber) {
      alert("Invalid Phone Number 🙄");
    } else {
      this._authService.login(this.password, this.countryCode + "" + this.phoneNumber).subscribe(data => {
        console.log(data)
        this._authService.logUserData().subscribe((data: any) => {
          console.log(data)
          /*    this._authService.loggedUser = data.userData; */
          this._authService.setuserSubjectSub(data.userData);
          this.router.navigate(["/home"]);
        },
          error => {
            console.log(error);
          });
      },
        error => {
          console.log(error);
        });
    }
  }


}
