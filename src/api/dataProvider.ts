import { User, AuthResponse, Product } from "../useCases/entities";

export interface ApiClient {
  getProducts?(): Promise<Product[]>;
  loginUser?(email: string, password: string): Promise<AuthResponse>;
  registerUser?(data: User): Promise<User>;
  getToken?(username: string, password: string): Promise<AuthResponse>;
}
