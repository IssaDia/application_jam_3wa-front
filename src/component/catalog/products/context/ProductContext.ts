import { createContext, Dispatch } from "react";
import { Product } from "../../../../useCases/entities";

type ProductState = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
};

type ProductAction =
  | { type: "GET_PRODUCTS" }
  | { type: "PRODUCTS_LOADED"; payload: Product[] }
  | { type: "PRODUCTS_ERROR" };

type ProductContextType = {
  productState: ProductState;
  productDispatch: Dispatch<ProductAction>;
};

export const ProductContext = createContext<ProductContextType>({
  productState: {
    products: [],
    isLoading: false,
    isError: false,
  },
  productDispatch: () => {},
});

export const productReducer = (state: ProductState, action: ProductAction) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        isLoading: true,
        isError: false,
        products: [],
      };
    case "PRODUCTS_LOADED":
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        isError: false,
      };
    case "PRODUCTS_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
