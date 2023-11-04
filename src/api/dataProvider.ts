import { User, AuthResponse, Product, Category } from "../useCases/entities";

export interface ApiClient {
  getProducts?(): Promise<Product[]>;
  getCategories?(): Promise<Category[]>;
  loginUser?(email: string, password: string): Promise<AuthResponse>;
  registerUser?(data: User): Promise<User>;
  getToken?(username: string, password: string): Promise<AuthResponse>;
  handlePayment?(cart: Product[]): Promise<string>;
}
