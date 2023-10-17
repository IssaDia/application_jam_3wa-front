enum UserRole {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_USER = "ROLE_USER",
}

export interface User {
  id: number;
  email: string;
  roles?: UserRole.ROLE_USER;
}

export interface AuthResponse {
  token: string;
}
export interface RegistrationResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}
