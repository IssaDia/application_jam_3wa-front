import { ApiClient } from "../api/dataProvider";
import {
  User,
  AuthResponse,
  Product,
  RegistrationResponse,
  PaymentMethod,
  Category,
} from "./entities";

export interface AuthUseCase {
  login(email: string, password: string): Promise<AuthResponse>;
  register(data: User): Promise<RegistrationResponse>;
}

// export interface RegisterUseCase {}

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

export interface CategoryUseCase {
  getCategories(): Promise<Category[]>;
}

export class CategoryUseCaseImpl implements CategoryUseCase {
  constructor(private apiClient: ApiClient) {}

  async getCategories(): Promise<Category[]> {
    try {
      return this.apiClient?.getCategories?.() || Promise.resolve([]);
    } catch (error: any) {
      throw new Error("Failed to get categories: " + error.message);
    }
  }
}

export class AuthUseCaseImpl implements AuthUseCase {
  constructor(private apiClient: ApiClient) {}

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const result = await this.apiClient?.loginUser?.(email, password);

      if (result) {
        return result;
      } else {
        throw new Error("Failed to log in");
      }
    } catch (error: any) {
      throw new Error("Failed to log in: " + error.message);
    }
  }

  async register(data: User): Promise<RegistrationResponse> {
    try {
      const registeredUser = await this.apiClient?.registerUser?.(data);
      return { success: true, user: registeredUser };
    } catch (error: any) {
      return {
        success: false,
        error: `Failed to register user: ${error.message}`,
      };
    }
  }
}

export interface PaymentUseCase {
  handlePayment(paymentMethod: PaymentMethod): Promise<PaymentResponse>;
}

export class PaymentUseCaseImpl implements PaymentUseCase {
  constructor(private apiClient: ApiClient) {}

  async handlePayment(paymentMethod: PaymentMethod): Promise<PaymentResponse> {
    try {
      const result = await this.apiClient?.handlePayment?.(paymentMethod);

      if (result) {
        return result;
      } else {
        throw new Error("Payment failed");
      }
    } catch (error: any) {
      throw new Error("Payment failed: " + error.message);
    }
  }
}
