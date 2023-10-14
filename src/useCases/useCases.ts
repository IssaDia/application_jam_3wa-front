import { ApiClient } from "../api/dataProvider";
import { User, AuthResponse, Product } from "./entities";

export interface LoginUseCase {
  login(email: string, password: string): Promise<AuthResponse>;
}

export interface RegisterUseCase {
  register(user: User): Promise<AuthResponse>;
}

export interface ProductUseCase {
  getProducts(): Promise<Product[]>;
}

export class ProductUseCaseImpl implements ProductUseCase {
  constructor(private apiClient: ApiClient) {}

  async getProducts(): Promise<Product[]> {
    try {
      return this.apiClient?.getProducts?.() || Promise.resolve([]);
    } catch (error: any) {
      throw new Error("Failed to get products: " + error.message);
    }
  }
}
