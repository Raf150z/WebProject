import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at?: string;
  updated_at?: string;
}

export interface Stats {
  total_products: number;
  total_customers: number;
  total_inventory_value: number;
  avg_price: number;
}

@Injectable({
  providedIn: 'root'
})
export class NodeGatewayService {

  private readonly BASE_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // ================= STATS =================
  async getStats(): Promise<Stats> {
    const response = await firstValueFrom(
      this.http.get<{ success: boolean; data: Stats }>(
        `${this.BASE_URL}/stats`
      )
    );
    return response.data;
  }

  // ================= PRODUCTS =================
  async getProducts(): Promise<Product[]> {
    const response = await firstValueFrom(
      this.http.get<{ success: boolean; data: Product[] }>(
        `${this.BASE_URL}/products`
      )
    );
    return response.data;
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await firstValueFrom(
      this.http.post<{ success: boolean; data: Product }>(
        `${this.BASE_URL}/products`,
        product
      )
    );
    return response.data;
  }

  async updateProduct(
    id: number,
    product: Partial<Product>
  ): Promise<Product> {
    const response = await firstValueFrom(
      this.http.put<{ success: boolean; data: Product }>(
        `${this.BASE_URL}/products/${id}`,
        product
      )
    );
    return response.data;
  }

  async deleteProduct(id: number): Promise<void> {
    await firstValueFrom(
      this.http.delete(`${this.BASE_URL}/products/${id}`)
    );
  }
}
