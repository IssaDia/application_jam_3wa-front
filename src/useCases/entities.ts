enum UserRole {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_USER = "ROLE_USER",
}

export interface User {
  id: number;
  email: string;
  roles: UserRole[];
}

export interface AuthResponse {
  tokenType: string; // Type of the token (e.g., "Bearer")
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}
