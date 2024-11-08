import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Product } from '../../types/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
})
export class AddproductComponent {
  private formBuilder = inject(FormBuilder);

  constructor(private productService: ApiService, private router: Router) {}

  addProductForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    stock: ['', Validators.required],
    price: [0, Validators.required],
    category: ['', Validators.required],
  });

  addProduct() {
    alert('Validation not added due to lack of time');
    this.productService
      .addNewProduct(this.addProductForm.value as Product)
      .subscribe(data=>{
        alert("added new product locally")
        this.router.navigate(['/home'])
      });
  }
}
