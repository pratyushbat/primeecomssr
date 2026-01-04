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

  selectedFiles: File[] = [];
  images: any[] = [];

  @Output() goBack = new EventEmitter<boolean>();
  @Output() isCreated = new EventEmitter<boolean>();

  loading: boolean = false;
  userData: any;
  productsForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    color: ['', Validators.required],
    price: ['', Validators.required],
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

    if (this.productsForm.invalid || this.selectedFiles.length === 0) {
      alert('Please fill all fields and select images');
      return;
    }
    if (this.productsForm.valid) {

      const formData = new FormData();

      let namePf: any = this.productsForm.value.name;
      let desPf: any = this.productsForm.value.description;
      let colorPf: any = this.productsForm.value.color;
      let pricePf: any = this.productsForm.value.price;
      let stockPf: any = this.productsForm.value.stock;
      let avgRatingPf: any = this.productsForm.value.avgRating;
      let totalRatingsPf: any = this.productsForm.value.totalRatings;
      let brandPf: any = this.productsForm.value.brand;
      let categoryPf: any = this.productsForm.value.category;

      formData.append('name', namePf);
      formData.append('description', desPf);
      formData.append('color', colorPf);
      formData.append('price', pricePf);
      formData.append('stock', stockPf);
      formData.append('avgRating', avgRatingPf);
      formData.append('totalRatings', totalRatingsPf);
      formData.append('brand', brandPf);
      formData.append('category', categoryPf);


      this.selectedFiles.forEach(file => {
        formData.append('images', file);
      });
      this.createProductAPi(formData)
    }



  }
  createProductAPi(formData:any) {

    this._authService.createProduct(formData).subscribe((data: any) => {
      console.log('added');
      this.isCreated.emit(true);
    })
  }

    onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.selectedFiles = Array.from(input.files);
  }

  goBackFunc() {
    this.goBack.emit(true);
  }

}
