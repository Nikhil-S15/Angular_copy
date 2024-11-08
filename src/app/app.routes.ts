import { Routes } from '@angular/router';
import { TableComponent } from './component/table/table.component';
import { AddproductComponent } from './component/addproduct/addproduct.component';
import { EditpageComponent } from './component/editpage/editpage.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix',
  },
  {
    path: 'home',
    component: TableComponent,
    pathMatch: 'prefix',
    title: 'Home Page'
  },
  {
    path: 'add',
    component: AddproductComponent,
    title: 'Add Product'
  },
  {
    path: 'edit/:id',
    component: EditpageComponent,
    title: 'Edit product'
  },
];
