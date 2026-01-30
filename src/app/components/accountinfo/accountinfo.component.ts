import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { usernameAsyncValidator } from '../../directive/userNameValidator';

@Component({
  selector: 'app-accountinfo',
  templateUrl: './accountinfo.component.html',
  styleUrl: './accountinfo.component.scss'
})
export class AccountinfoComponent implements OnInit {

  userData: any;

  loading = false;
  get isLoading() {
    return this.loading || this.addressForm.pending || this.addressForm.invalid;
  }

  addressForm = this.fb.group({
    fullName: ['', Validators.required, [usernameAsyncValidator]],
    phone: ['', Validators.required],
    addressLine1: ['', Validators.required],
    addressLine2: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    pincode: ['', Validators.required],
    country: ['India', Validators.required],
    isDefault: [false, Validators.required],
  });
  addressUpdate: any;
  selectedAddress: any;
  isAddAddress: boolean = false;
  booleanOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
  ];


  countries = ['India'];
  canSubmit: any;

  get emailInvalid() {
    const control = this.addressForm.get('fullName');
    return control?.invalid && control?.touched;
  }

  constructor(private _authService: AuthService, private router: Router, private fb: FormBuilder, private _alertService: AlertService) {

  }
  ngOnInit(): void {
    this.getData()
  }

  getData() {


    this._authService.userStatus$().subscribe(data => {
      if (data) {
        this.userData = data;
        if (this.userData?.addresses?.length)
          this.selectedAddress = this.userData.addresses[0];
        this.patchAddreesssForm();
      }
      else
        this._authService.reloadData();

    })

  }



  logOut() {
    this.loading = true;
    this._authService.logout().subscribe(data => {
      this._alertService.success('Logout successfully!');
      this._authService.setuserSubjectSub(null);
      this.loading = false;
      this.router.navigate(["/login"]);
    }, err => { this.loading = false; });
  }

  saveAdd() {
    if (this.addressForm.pending) return;
    else if (this.addressForm.invalid) {
      this._alertService.error('Please fill all fields');
      return;
    }

    this.saveAddressApi(this.addressForm.value);
  }
  saveAddressApi(address: any) {
    this.loading = true;

    this._authService.saveAddress(address).subscribe({
      next: res => {
        this.loading = false;
        this._alertService.success('Address added successfully!');
        this._authService.reloadData();
      },
      error: err => {
        this._alertService.error(err?.error?.message ? err.error.message : 'something went wrong while saving address');
        this.loading = false;
      },
    });
  }

  editAddress() {

    this.addressUpdate = { ...this.addressForm.value, addressId: this.selectedAddress._id };
    this.saveAddressApi(this.addressUpdate);
  }

  patchAddreesssForm() {
    this.addressForm.patchValue({
      fullName: this.userData.firstName + ' ' + this.userData.lastName,
      phone: this.userData.phoneNumber,
      city: this.userData.userLocationData.city,
      state: this.userData.userLocationData.region,
    });
  }

}

