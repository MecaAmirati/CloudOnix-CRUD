import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';

@NgModule({
  imports: [CommonModule, ProductListComponent],
  exports: [ProductListComponent]
})
export class ProductListModule { }
