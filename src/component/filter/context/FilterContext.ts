import { createContext, Dispatch } from "react";
import CategoryApiClient from "../../../api/ApiPlatform/CategoryProvider";
import ProductApiClient from "../../../api/ApiPlatform/ProductProvider";
import { Category, Product } from "../../../useCases/entities";
import {
  CategoryUseCaseImpl,
  ProductUseCaseImpl,
} from "../../../useCases/useCases";

interface FilterState {
  categories: Category[];
  filteredProducts: Product[];
}

type InitializeFilterAction = {
  type: "INITIALIZE_FILTER";
};

type FilterBySortAction = {
  type: "FILTER_BY_SORT";
  payload: {
    field: string;
    order: string;
  };
};

type FilterByTypeAction = {
  type: "FILTER_BY_TYPE";
  payload: {
    type?: string;
  };
};

type FilterByPriceAction = {
  type: "FILTER_BY_PRICE";
  payload: {
    min?: number;
    max?: number;
  };
};

type FilterBySearchAction = {
  type: "FILTER_BY_SEARCH";
  payload: {
    inputValue?: string;
  };
};

type FilterAction =
  | InitializeFilterAction
  | FilterByTypeAction
  | FilterByPriceAction
  | FilterBySearchAction
  | FilterBySortAction;

interface FilterContextType {
  filterState: FilterState;
  filterDispatch: Dispatch<FilterAction>;
}

const categoryApiClient = new CategoryApiClient();
const categoryUseCase = new CategoryUseCaseImpl(categoryApiClient);
const categories = await categoryUseCase.getCategories();

const productApiClient = new ProductApiClient();
const productUseCase = new ProductUseCaseImpl(productApiClient);
const products = await productUseCase.getProducts();

const FilterContext = createContext<FilterContextType>({
  filterState: {
    filteredProducts: [],
    categories: categories,
  },
  filterDispatch: () => {},
});

export const filterReducer = (state: FilterState, action: FilterAction) => {
  switch (action.type) {
    case "INITIALIZE_FILTER":
      return {
        ...state,
        categories: categories,
      };

    case "FILTER_BY_TYPE":
      const { type } = action.payload;

      if (type === "") {
        return {
          ...state,
          filteredProducts: products["hydra:member"],
        };
      }

      const productsByType: Product[] = [];

      const categoryFiltered = categories["hydra:member"]?.filter(
        (category: Category) => {
          return category.name === type;
        }
      );

      categoryFiltered?.forEach((category: Category) => {
        const products = category.products;
        products.forEach((product) => {
          productsByType.push(product);
        });
      });

      return {
        ...state,
        filteredProducts: productsByType,
      };

    case "FILTER_BY_PRICE":
      const { min, max }: { min?: number; max?: number } = action.payload;

      const productsByPrice = products["hydra:member"]?.filter(
        (product: Product) => {
          const price = product.price;

          return price >= min && price <= max;
        }
      );

      return {
        ...state,
        filteredProducts: productsByPrice,
      };

    case "FILTER_BY_SEARCH":
      const { inputValue } = action.payload;
      let productsSearched = products?.filter((product: Product) => {
        return product.name.toLowerCase().includes(inputValue?.toLowerCase());
      });

      return {
        ...state,
        filteredProducts: productsSearched,
      };

    case "FILTER_BY_SORT":
      const { field, order } = action.payload;

      const sortedProducts = [...state.filteredProducts];
      sortedProducts.sort((a, b) => {
        if (field === "name") {
          if (order === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        } else if (field === "price") {
          if (order === "asc") {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        }
        return 0;
      });

      console.log(sortedProducts);

      return {
        ...state,
        filteredProducts: sortedProducts,
      };

    default:
      return state;
  }
};

export default FilterContext;
