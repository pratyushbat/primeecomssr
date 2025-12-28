import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, firstValueFrom, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "http://localhost:8000/api";

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

private isLoading = false;
  constructor(private http: HttpClient) { }

   get currentUser(): any | null {
    return this.userSubject.value;
  }

    refreshUser(): Observable<any | null> {
    if (this.isLoading) {
      return this.user$;
    }

    this.isLoading = true;

    return this.http.get(this.url + "/user/getloggeduser", { withCredentials: true }).pipe(
      tap((user:any) => this.userSubject.next(user.userData)),
      catchError(() => {
        this.userSubject.next(null);
        return of(null);
      }),
      finalize(() => this.isLoading = false)
    );
  }

  login(password: string, mobile: string) {
    return this.http.post(this.url + "/user/login", { password, phoneNumber: mobile });
  }
 


  logUserData() {
    return this.http.get(this.url + "/user/getloggeduser", { withCredentials: true });
  }

  sendOtp(phoneNumber: string, email: string) {
    return this.http.post(this.url + "/user/register/sendotp?phoneNumber=" + phoneNumber, { email });
  }

  resendOtp(phoneNumber: string, userData: any) {
    return this.http.post(this.url + "/user/resentotp?phoneNumber=" + phoneNumber, { userData });
  }

  register(phoneNumber: string, verificationCode: string, userData: any) {
    console.log('registering')
    return this.http.post(this.url + "/user/verify/register?phoneNumber=" + phoneNumber + "&verificationCode=" + verificationCode, userData);
  }

  async loadUser() {
    this.logUserData().subscribe((user: any) => {
      this.userSubject.next(user.userData);
      return user;
    }
      , err => {
        this.userSubject.next(null);
        return null;
      }
    )

  }


  get user() {
    return this.userSubject.value;
  }

  get userSubjectSub() {
    return this.userSubject;
  }
  setuserSubjectSub(user: any) {
    this.userSubject.next(user);
  }

  logout() {
     return  this.http.get(this.url + "/user/logout");
  }

  get userObs() {
    return this.user$;
  }

  getoLoaction(): any {
    return this.http.get("https://ipinfo.io/json");
  }

}
