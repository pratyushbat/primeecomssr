import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, finalize, firstValueFrom, map, Observable, of, Subject, take, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  sendMessage(data: { message: String; email: any; }) {
    return of(true)
  }

  private destroy$ = new Subject<void>();
  /* "https://girisa.shop" */
  url: string =
    'http://localhost:8000';

  private userSubject = new BehaviorSubject<any>(null);
  authState$ = new BehaviorSubject<boolean | null>(null);
  private isLoading = false;
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {

    this.loadUser();
  }

  getUrlClientProd() {
    return this.url;
  }

  get currentUser(): any | null {
    return this.userSubject.value;
  }


  login(password: string, mobile: string) {
    return this.http.post("/api/user/login", { password, phoneNumber: mobile });
  }



  logUserData() {
    return this.http.get("/api/user/getloggeduser", { withCredentials: true });
  }

  sendOtp(phoneNumber: string, email: string) {
    return this.http.post("/api/user/register/sendotp?phoneNumber=" + phoneNumber, { email });
  }

  resendOtp(phoneNumber: string, userData: any) {
    return this.http.post("/api/user/resentotp?phoneNumber=" + phoneNumber, { userData });
  }

  register(phoneNumber: string, verificationCode: string, userData: any) {
    return this.http.post("/api/user/verify/register?phoneNumber=" + phoneNumber + "&verificationCode=" + verificationCode, userData);
  }


  authStatus$() {
    return this.authState$.asObservable();
  }

  userStatus$() {
    return this.userSubject.asObservable();
  }


  async loadUser() {


    if (isPlatformBrowser(this.platformId)) {
      let isUsercahche = JSON.parse(localStorage.getItem('isLoggedIn'));
      let usercahche = JSON.parse(localStorage.getItem('user'));
      if (this.userSubject.value || isUsercahche) {
        this.userSubject.next(this.userSubject.value ? this.userSubject.value : usercahche);
        this.authState$.next(true);
        return this.userSubject.value ? this.userSubject.value : usercahche;
      }

      else {
        return this.reloadData();
      }

    }
    else
      return of(false)
  }
  reloadData() {
    this.logUserData().pipe(
      takeUntil(this.destroy$), take(1),
      map((user: any) => user.userData),
      tap((user: any) => {
        this.setuserSubjectSub(user);
      }),
      catchError(() => {
        this.setuserSubjectSub(null);
        return of(null);
      }),
      finalize(() => this.isLoading = false)
    );
  }

  preloadAuth() {
    if (isPlatformBrowser(this.platformId)) {
      let isUsercahche = JSON.parse(localStorage.getItem('isLoggedIn'));
      let usercahche = JSON.parse(localStorage.getItem('user'));
      // prevent multiple calls
      if (this.authState$.value !== null || !!isUsercahche) {
        return of(this.authState$.value ? this.authState$.value : usercahche);
      }

      return this.logUserData().pipe(
        map((user: any) => user.userData),
        tap((data) => {
          this.authState$.next(true);
          this.userSubject.next(data)
        }),
        catchError(() => {
          this.authState$.next(false);
          this.userSubject.next(null)
          return of(false);
        })
      );
    }
    else
      return of(false)

  }
  preloadNAuth() {
    // prevent multiple calls
    if (this.authState$.value !== null) {
      return of(false);
    }

    return this.logUserData().pipe(
      tap(() => this.authState$.next(false)),
      catchError(() => {
        this.authState$.next(true);
        return of(false);
      })
    );
  }
  get user() {
    return this.userSubject.value;
  }

  get userSubjectSub() {
    return this.userSubject;
  }
  setuserSubjectSub(user: any) {
    if (isPlatformBrowser(this.platformId)) {
      if (!!user) {

        this.userSubject.next(user);
        this.authState$.next(true);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(user));
      }
      else {
        this.userSubject.next(null);
        this.authState$.next(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
      }
    }


  }

  logout() {
    return this.http.get("/api/user/logout");
  }



  getoLoaction(): any {
    return this.http.get("https://ipinfo.io/json");
  }



  saveAddress(payload: any): Observable<any> {
    return this.http.post(`${this.url}/user/addUpdateAddress`, payload);
  }


  deleteAddress(addressId: string): Observable<any> {
    return this.http.delete(`${this.url}/user/address/${addressId}`);
  }

  loading() {
    return this.isLoading;
  }


  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.complete();
  }


}
