import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://rest-items.research.cloudonix.io/items';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const authKey = localStorage.getItem('authKey') || '';
    return new HttpHeaders({ 'Authorization': `Bearer ${authKey}` });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, { headers: this.getAuthHeaders() });
  }

  updateProduct(product: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${product.id}`, product, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
