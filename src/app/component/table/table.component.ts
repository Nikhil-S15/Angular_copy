import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../service/api.service';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { Product } from '../../types/types';
import { RouterLink } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    RatingModule,
    ButtonModule,
    FormsModule,
    TooltipModule,
    ProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [],
})
export class TableComponent {
  products!: Product[];
  isLowStock!: boolean
  isProductLoaded: boolean = false

  constructor(private productService: ApiService) {}

  ngOnInit() {
    this.productService.products$.subscribe(data=>{
      this.products = data
      setTimeout(() => {
        this.isProductLoaded = true
      }, 1000);
    })
  }
}
