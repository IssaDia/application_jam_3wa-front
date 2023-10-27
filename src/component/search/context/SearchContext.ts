import { createContext, Dispatch } from "react";
import { Product } from "../../../useCases/entities";

interface SearchState {
  products: Product[];
  filteredProducts: Product[];
  filtering: boolean;
}
type SearchAction = {
  type: "FILTER";
  payload: { inputValue: string; products: Product[] };
};

interface SearchContextType {
  searchState: SearchState;
  searchDispatch: Dispatch<SearchAction>;
}

const SearchContext = createContext<SearchContextType>({
  searchState: {
    products: [],
    filteredProducts: [],
    filtering: false,
  },
  searchDispatch: () => {},
});

export const searchReducer = (state: SearchState, action: SearchAction) => {
  switch (action.type) {
    case "FILTER":
      const { inputValue, products } = action.payload;
      let filter;

      let filtered = products;
      if (inputValue !== "") {
        filter = true;
        filtered = products.filter((product: Product) => {
          return product.name.toLowerCase().includes(inputValue.toLowerCase());
        });
      } else {
        filtered = [];
      }

      if (inputValue === "") {
        filter = false;
      }

      return {
        ...state,
        filteredProducts: filtered,
        filtering: filter,
      };

    default:
      return state;
  }
};

export default SearchContext;
