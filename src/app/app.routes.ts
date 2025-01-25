import { ProductDetailsComponent } from './components/product-detail/product-detail.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  { path: '**', redirectTo: '/login' },
  { path: 'products/:id', component: ProductDetailsComponent },

];
