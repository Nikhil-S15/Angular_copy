import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { GetProducts, Product } from '../types/types';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  productSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productSubject.asObservable();
  constructor(private http: HttpClient) {}

  loadProducts() {
    return this.http
      .get<GetProducts>(
        `${environment.BASE_URL}/products?limit=5&select=id,title,price,description,category,rating,thumbnail,stock`
      )
      .pipe(
        tap((products) => {
          this.productSubject.next(products.products as Product[]);
        })
      );
  }

  getProduct(producId: number) {
    return this.products$.pipe(
      map((products) => products.find((product) => product.id === producId))
    );
  }

  updateProduct(product: Partial<Product>) {
    return this.http
      .put(`${environment.BASE_URL}/products/${product.id}`, {
        title: product?.title,
        description: product?.description,
        stock: product?.stock,
        price: Number(product?.price as number) / 84,
        category: product?.category,
      })
      .pipe(
        tap((updatedProduct: Product) => {
          // Get the current products from the BehaviorSubject
          const currentProducts = this.productSubject.getValue();

          // Find the index of the product to be updated
          const index = currentProducts.findIndex(
            (p) => p.id === updatedProduct.id
          );

          if (index !== -1) {
            // Update the specific product in the BehaviorSubject
            currentProducts[index] = updatedProduct;
            this.productSubject.next(currentProducts);
          }
        }),
        map(() => product) // Return the updated product object
      );
  }

  addNewProduct(product: Partial<Product>) {
    return this.http
      .post(`${environment.BASE_URL}/products/add`, {
        title: product?.title,
        description: product?.description,
        stock: product?.stock,
        price: Number(product.price) / 84,
        category: product?.category,
      })
      .pipe(
        tap((newProduct: Product) => {
          const currentProducts = this.productSubject.getValue();
          currentProducts.push(newProduct);
          this.productSubject.next(currentProducts);
        })
      );
  }
}
