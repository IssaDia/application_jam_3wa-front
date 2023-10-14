import { ApiClient } from "../api/dataProvider";
import { User, AuthResponse, Product } from "./entities";

export interface LoginUseCase {
  login(email: string, password: string): Promise<AuthResponse | undefined>;
}

export interface RegisterUseCase {
  register(user: User): Promise<User | undefined>;
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

  async login(
    email: string,
    password: string
  ): Promise<AuthResponse | undefined> {
    try {
      const response = await this.apiClient?.loginUser?.(email, password);
      return response;
    } catch (error: any) {
      throw new Error("Failed to log in: " + error.message);
    }
  }
}

export class RegisterUseCaseImpl implements RegisterUseCase {
  constructor(private apiClient: ApiClient) {}

  async register(user: User): Promise<User | undefined> {
    try {
      const registeredUser = await this.apiClient?.registerUser?.(user);
      return registeredUser;
    } catch (error: any) {
      throw new Error(`Failed to register user: ${error.message}`);
    }
  }
}
