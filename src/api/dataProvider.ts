import { User, AuthResponse, Product } from "../useCases/entities";

export interface ApiClient {
  getProducts?(): Promise<Product[]>;
  loginUser?(): Promise<AuthResponse>;
  registerUser?(user: User): Promise<AuthResponse>;
}
