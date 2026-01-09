import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Subject } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent implements OnInit, OnDestroy {
  /*   private destroy$ = new Subject<void>(); */
  public isLoading: boolean = false;
  constructor(private fb: FormBuilder, private _productService: ProductsService, private _alertService: AlertService) {

  }


  ngOnInit(): void {

  }


  contactUsForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  saveContact() {
    console.log(this.contactUsForm.value)
    if (this.contactUsForm.invalid) {
      this._alertService.error('Please fill all fields');
      return;
    }
    this.contactApi(this.contactUsForm.value);

  }


  contactApi(data: any) {
    this.isLoading = true;

    this._productService.createLead(data).subscribe({
      next: res => {
        this.isLoading = false;
        this._alertService.success('Order placed successfully!');
      },
      error: err => {
        this._alertService.error(err?.error?.message ? err.error.message : 'something went wrong');
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy() {
    /*     this.destroy$?.next();
        this.destroy$?.complete(); */

  }
}
