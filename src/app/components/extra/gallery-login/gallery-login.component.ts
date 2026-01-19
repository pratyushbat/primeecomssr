

import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { SharingService } from "../../../services/extra/sharing.service";
import { isPlatformBrowser } from "@angular/common";
import { ModalService } from "../../../services/modal.service";
@Component({
  selector: 'app-gallery-login',
  templateUrl: './gallery-login.component.html',
  styleUrl: './gallery-login.component.scss'
})
export class GalleryLoginComponent implements OnInit, OnDestroy {
  login = true;
  cpassErr: Boolean = false;
  signupErr: any = "";
  loginErr: any;
  signUpPasswordErr: any = "";
  signUpEmailErr: any = "";
  SIGNUPloading: Boolean = false
  LOGINloading: Boolean = false
  passwordErr: any;
  emailErr: any;
  logInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  signUpForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),

    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });
  constructor(
    private ElementRef: ElementRef,
    private _authService: AuthService,
    private Router: Router,
    private modalService: ModalService,
    private _sharingService: SharingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {

  }
  switch() {
    if (this.login) {
      this.login = !this.login;
      this.ElementRef.nativeElement
        .querySelector("#signUp")
        .classList.remove("hide");
      this.ElementRef.nativeElement
        .querySelector("#logIn")
        .classList.add("hide");
    } else {
      this.login = !this.login;
      this.ElementRef.nativeElement
        .querySelector("#signUp")
        .classList.add("hide");
      this.ElementRef.nativeElement
        .querySelector("#logIn")
        .classList.remove("hide");
    }
  }

  signUp() {
    this.SIGNUPloading = !this.SIGNUPloading

    this._authService.register(this.signUpForm.value, '', '').subscribe(
      (data: any) => {
        if (data.message == "added successfully") {
          this.SIGNUPloading = !this.SIGNUPloading

          this.cpassErr = false;
          this.signupErr = "";
          this.switch();
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);

        this.SIGNUPloading = !this.SIGNUPloading

        if (err?.error?.validationArr) {
          this.signupErr = "";
          this.cpassErr = true;
        } else if (
          err.error.message == "this email already register" ||
          err.error.message == "invalid email"
        ) {
          console.log('k');

          this.signUpEmailErr = err.error.message;
        } else {
          this.cpassErr = false;
        }
      }
    );
  }
  Login() {
    this.LOGINloading = !this.LOGINloading
    this._authService.login(this.logInForm.value.email, this.logInForm.value.password).subscribe(
      (data: any) => {

        console.log(data);

        if (data.token) {
          this.LOGINloading = !this.LOGINloading

          this.passwordErr = "";
          this.emailErr = "";
          this.loginErr = "";
          if (isPlatformBrowser(this.platformId))
            localStorage.setItem("userToken", data.token);
          this._sharingService.updateUserData();
          this.Router.navigate(["/home"]);
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);

        this.LOGINloading = !this.LOGINloading

        if (err.error.message == "in valid password") {
          this.emailErr = "";
          this.passwordErr = "in valid password";
        } else if (err.error.message == "You have to register first") {
          this.passwordErr = "";
          this.emailErr = "You have to register first";
        } else {
          this.passwordErr = "";
          this.emailErr = "";
          this.loginErr = err.error.message;
        }
      }
    );
  }
  close() {
    this.modalService.close();
  }
  ngOnDestroy(): void {
    this.modalService?.close();
  }

}
