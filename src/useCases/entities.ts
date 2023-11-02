enum UserRole {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_USER = "ROLE_USER",
}

export interface User {
  id: number;
  email: string;
  roles?: UserRole[];
}

export interface AuthenticatedUser {
  iat: number;
  exp: number;
  roles: UserRole;
  username: string;
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
  [x: string]: any;
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface Category {
  "@id": string;
  "@type": string;
  id: number;
  name: string;
  slug: string;
  products: Product[];
}
