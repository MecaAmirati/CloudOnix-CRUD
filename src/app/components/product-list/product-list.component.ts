import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = {
    name: '',
    description: '',
    sku: '',
    cost: 0,
    profile: {
      type: 'furniture',
      available: true,
      backlog: undefined
    }
  };
  editingProduct: Product | null = null;
  viewingProduct: Product | null = null;
  isEditModalOpen: boolean = false;
  isViewModalOpen: boolean = false;
  isModalOpen: boolean = false;
  isConfirmModalOpen: boolean = false;
  confirmProductId: string | null = null;
  deleteConfirmationInput: string = '';
  addErrorMessage: string = '';
  deleteErrorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => (this.products = products),
      (error) => console.error('Erro ao carregar produtos:', error)
    );
  }

  addProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe(
      (createdProduct) => {
        this.products.push(createdProduct);
        this.resetNewProduct();
        this.closeModal();
      },
      (error) => console.error('Erro ao adicionar produto:', error)
    );
  }

  resetNewProduct(): void {
    this.newProduct = {
      name: '',
      description: '',
      sku: '',
      cost: 0,
      profile: {
        type: 'furniture',
        available: true,
        backlog: undefined
      }
    };
  }

  viewProduct(product: Product): void {
    this.viewingProduct = { ...product };
    this.isViewModalOpen = true;
  }

  closeViewModal(): void {
    this.isViewModalOpen = false;
    this.viewingProduct = null;
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };
    this.isEditModalOpen = true;
  }

  openEditModal(product: Product): void {
    this.isEditModalOpen = true;
    this.editingProduct = { ...product };
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editingProduct = null;
  }

  updateProduct(): void {
    if (this.editingProduct) {
      const { sku, ...updateData } = this.editingProduct; // Remove o SKU antes de enviar os dados
      this.productService.updateProduct(updateData).subscribe(
        (updatedProduct: Product) => {
          const index = this.products.findIndex((p) => p.id === updatedProduct.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.editingProduct = null;
          this.isEditModalOpen = false;
        },
        (error) => {
          console.error('Erro ao atualizar produto:', error);
        }
      );
    }
  }

  confirmDelete(productId: string): void {
    this.isConfirmModalOpen = true;
    this.confirmProductId = productId;
    this.deleteErrorMessage = '';
  }

  confirmDeletion(): void {
    if (this.deleteConfirmationInput === 'DELETE' && this.confirmProductId) {
      this.deleteProduct(this.confirmProductId);
    } else {
      this.deleteErrorMessage = 'Por favor, digite "DELETE" para confirmar.';
    }
  }

  deleteProduct(productId: string | null): void {
    if (productId) {
      this.productService.deleteProduct(Number(productId)).subscribe(
        () => {
          this.products = this.products.filter(product => product.id !== productId);
          this.closeConfirmModal();
        },
        (error) => {
          console.error('Erro ao deletar produto:', error);
          this.deleteErrorMessage = 'Erro ao deletar o produto. Tente novamente mais tarde.';
        }
      );
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  closeConfirmModalOnClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeConfirmModal();
    }
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  closeConfirmModal(): void {
    this.isConfirmModalOpen = false;
    this.confirmProductId = null;
    this.deleteConfirmationInput = ''; // Limpa o input
    this.deleteErrorMessage = ''; // Limpa a mensagem de erro
  }
}
