import { createContext } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Check if the product is already in the cart
      const { product, quantity } = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        // If it exists, increment the quantity
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: quantity + item.quantity }
              : item
          ),
        };
      } else {
        // If it doesn't exist, add it to the cart
        return {
          ...state,
          cart: [...state.cart, { ...product, quantity: 1 }],
        };
      }
    case "REMOVE_FROM_CART":
      // Remove the product from the cart
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== product.id),
      };
    case "LOAD_CART":
      // Load the cart data from local storage
      return {
        ...state,
        cart: action.payload, // Assuming action.payload is the loaded cart data
      };
    default:
      return state;
  }
};
