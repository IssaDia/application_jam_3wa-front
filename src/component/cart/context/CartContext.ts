import { createContext } from "react";

// Define a type for the cart item
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  // Add other fields as needed
};

// Define a type for the cart state
type CartState = {
  cart: CartItem[];
};

// Define a type for the cart action
type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: CartItem; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { product: CartItem } }
  | { type: "LOAD_CART"; payload: CartItem[] };

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");

  return cartData ? JSON.parse(cartData) : [];
};

export const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: {
    cart: loadCartFromLocalStorage(),
  },
  dispatch: () => {},
});

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { product, quantity } = action.payload;

      if (!state.cart || state.cart.length === 0) {
        const updatedCart = [{ ...product, quantity }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return {
          ...state,
          cart: updatedCart,
        };
      }

      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        const updatedCart = state.cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return {
          ...state,
          cart: updatedCart,
        };
      }
      const updatedCart = [...state.cart, { ...product, quantity: quantity }];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...state,
        cart: updatedCart,
      };

    case "REMOVE_FROM_CART":
      const productToRemove = action.payload.product;

      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== productToRemove.id),
      };
    case "LOAD_CART":
      const loadedCart = loadCartFromLocalStorage();

      return {
        ...state,
        cart: loadedCart,
      };
    default:
      return state;
  }
};
