import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Product } from '../../types/types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editpage',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editpage.component.html',
  styleUrl: './editpage.component.css',
})
export class EditpageComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productId: number = 0;
  productValue!: Product | undefined;
  private formBuilder = inject(FormBuilder);

  productForm = this.formBuilder.group({
    id: [0],
    title: [''],
    description: [''],
    stock: [''],
    price: [0],
    category: [''],
  });

  constructor(private productApi: ApiService, private router: Router) {
    this.productId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.productApi.getProduct(this.productId).subscribe((product) => {
      this.productValue = product;
      this.productForm.patchValue({
        id: product?.id,
        title: product?.title,
        description: product?.description,
        stock: product?.stock,
        price: Number(product?.price as number) * 84,
        category: product?.category,
      });
    });
  }

  submitForm() {
    if (this.productForm.untouched && !this.productForm.dirty) {
      alert('Hmmmm...no changes');
    } else {
      this.productApi
        .updateProduct(this.productForm.value as Product)
        .subscribe((data) => {
          alert(
            "Sorry, didn't get time to include a toaster or validation, but the Product is update in the local state tho!!!. Since DummyJson will not allow permanent update, the edit will go if you refresh the page!"
          );
          this.router.navigate(['/home']);
        });
    }
  }

  onDestroy() {}
}
