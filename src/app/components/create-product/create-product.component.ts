import { Component, EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  @Output() goBack = new EventEmitter<boolean>();
  @Output() isCreated = new EventEmitter<boolean>();

  loading: boolean = false;
  userData: any;
  productsForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    color: ['', Validators.required],
    price: [1, Validators.required],
    images: [['']],
    stock: [1, Validators.required],
    avgRating: [0, Validators.required],
    totalRatings: [0, Validators.required],
    brand: ['', Validators.required],
    category: ['', Validators.required],

  });

  constructor(private _authService: ProductsService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  createProduct() {
    console.log(this.productsForm)
    if (this.productsForm.valid) {
      console.log('Form submitted:', this.productsForm.value);
      this.createProductAPi()
    }



  }
  createProductAPi() {

    this._authService.createProduct(this.productsForm.value).subscribe((data: any) => {
      console.log('added');
      this.isCreated.emit(true);
    })
  }
  goBackFunc() {
    this.goBack.emit(true);
  }

}
