import { ProductDetailsComponent } from './components/product-detail/product-detail.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireciona para login se a rota for vazia
  { path: 'login', component: LoginComponent }, // Caminho explícito para login
  { path: 'products', component: ProductListComponent }, // Página de listagem de produtos
  { path: '**', redirectTo: '/login' }, // Redireciona para login para qualquer rota inválida
  { path: 'products/:id', component: ProductDetailsComponent },

];
