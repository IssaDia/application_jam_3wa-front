import { ApiClient } from "../api/dataProvider";
import { User, AuthResponse, Product, RegistrationResponse } from "./entities";

export interface LoginUseCase {
  login(email: string, password: string): Promise<AuthResponse>;
}

export interface RegisterUseCase {
  register(data: User): Promise<RegistrationResponse>;
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

export class LoginUseCaseImpl implements LoginUseCase {
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
}

export class RegisterUseCaseImpl implements RegisterUseCase {
  constructor(private apiClient: ApiClient) {}

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
