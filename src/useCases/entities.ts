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

export interface PaymentMethod {
  cardElement: any;
}

export interface PaymentResponse {
  details: any;
  methodName: string;
  requestId: string;
  complete: (result?: PaymentComplete) => Promise<void>;
  retry: () => Promise<PaymentResponse>;
  toJSON: () => any; // You can define this as per your response format
  addEventListener: (event: string, callback: (event: Event) => void) => void;
  dispatchEvent: (event: Event) => boolean;
  removeEventListener: (
    event: string,
    callback: (event: Event) => void
  ) => void;
}
