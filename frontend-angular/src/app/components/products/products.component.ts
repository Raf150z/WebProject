import { Component, OnInit } from '@angular/core';
import { NodeGatewayService, Product } from '../../services/node-gateway.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error: string | null = null;
  
  // Para formulario
  showForm = false;
  editingProduct: Product | null = null;
  newProduct: Omit<Product, 'id' | 'created_at' | 'updated_at'> = {
    name: '',
    description: '',
    price: 0,
    stock: 0
  };

  constructor(private nodeGateway: NodeGatewayService) {}

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      this.loading = true;
      this.products = await this.nodeGateway.getProducts();
      this.error = null;
    } catch (error) {
      console.error('Error loading products:', error);
      this.error = 'Error al cargar productos';
    } finally {
      this.loading = false;
    }
  }

  async createProduct(): Promise<void> {
    if (!this.validateProduct(this.newProduct)) return;

    try {
      const created = await this.nodeGateway.createProduct(this.newProduct);
      this.products.push(created);
      this.resetForm();
      this.error = null;
    } catch (error) {
      console.error('Error creating product:', error);
      this.error = 'Error al crear producto';
    }
  }

  async updateProduct(): Promise<void> {
    if (!this.editingProduct || !this.validateProduct(this.newProduct)) return;

    try {
      const updated = await this.nodeGateway.updateProduct(
        this.editingProduct.id,
        this.newProduct
      );
      
      const index = this.products.findIndex(p => p.id === this.editingProduct!.id);
      if (index !== -1) {
        this.products[index] = updated;
      }
      
      this.resetForm();
      this.error = null;
    } catch (error) {
      console.error('Error updating product:', error);
      this.error = 'Error al actualizar producto';
    }
  }

  async deleteProduct(id: number): Promise<void> {
    if (!confirm('¿Está seguro de eliminar este producto?')) return;

    try {
      await this.nodeGateway.deleteProduct(id);
      this.products = this.products.filter(p => p.id !== id);
      this.error = null;
    } catch (error) {
      console.error('Error deleting product:', error);
      this.error = 'Error al eliminar producto';
    }
  }

  editProduct(product: Product): void {
    this.editingProduct = product;
    this.newProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    };
    this.showForm = true;
  }

  resetForm(): void {
    this.editingProduct = null;
    this.newProduct = {
      name: '',
      description: '',
      price: 0,
      stock: 0
    };
    this.showForm = false;
  }

  private validateProduct(product: any): boolean {
    if (!product.name.trim()) {
      this.error = 'El nombre es requerido';
      return false;
    }
    if (product.price <= 0) {
      this.error = 'El precio debe ser mayor a 0';
      return false;
    }
    if (product.stock < 0) {
      this.error = 'El stock no puede ser negativo';
      return false;
    }
    return true;
  }
}