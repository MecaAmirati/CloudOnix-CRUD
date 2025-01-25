import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: '../product-detail/product-detail.component.html',
  styleUrls: ['../product-detail/product-detail.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.product = products.find(product => product.id === productId.toString())!;
      },
      error: (err: any) => console.error('Error loading product details:', err),
    });
  }
}
