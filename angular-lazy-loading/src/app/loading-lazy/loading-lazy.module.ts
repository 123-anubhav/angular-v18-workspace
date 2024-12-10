import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { CustomerComponent } from '../customer/customer.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'customers', component: CustomerComponent }
];

@NgModule({
  
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Use forChild for lazy-loaded modules
  /*   ProductComponent, // Import standalone component
    CustomerComponent // Import standalone component */
  ],
  exports: [RouterModule]
})
export class LoadingLazyModule {
  constructor() {
    console.log('LoadingLazyModule constructor execute');

  }
}
