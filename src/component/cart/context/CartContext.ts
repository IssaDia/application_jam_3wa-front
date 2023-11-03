import { createContext } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartState = {
  cart: CartItem[];
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: CartItem } }
  | { type: "REMOVE_FROM_CART"; payload: { product: CartItem } }
  | { type: "LOAD_CART"; payload: CartItem[] };

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");

  return cartData ? JSON.parse(cartData) : [];
};

export const CartContext = createContext<{
  cartState: CartState;
  cartDispatch: React.Dispatch<CartAction>;
}>({
  cartState: {
    cart: loadCartFromLocalStorage(),
  },
  cartDispatch: () => {},
});

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { product } = action.payload;

      if (!state.cart || state.cart.length === 0) {
        const updatedCart = [{ ...product }];
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
                quantity: item.quantity,
              }
            : item
        );

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return {
          ...state,
          cart: updatedCart,
        };
      }
      const updatedCart = [...state.cart, { ...product }];

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
