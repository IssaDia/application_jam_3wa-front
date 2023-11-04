import { createContext, Dispatch } from "react";
import CategoryApiClient from "../../../api/ApiPlatform/CategoryProvider";
import ProductApiClient from "../../../api/ApiPlatform/ProductProvider";
import { Category, Product } from "../../../useCases/entities";
import {
  CategoryUseCaseImpl,
  ProductUseCaseImpl,
} from "../../../useCases/useCases";
import {
  filterProductsByPrice,
  filterProductsBySearch,
  filterProductsByType,
  sortProducts,
} from "../../../utils/helpers";

type FilterTypes = "search" | "sort" | "price" | "type";

interface FilterState {
  categories: Category[];
  filteredProducts: Product[];
  filterTypes: FilterTypes[];
}

type FilterTypeAction = {
  type: "FILTER";
  payload: {
    filterTypeName: string;
    arg?: {
      selectedType?: string;
      inputValue?: string;
      price?: {
        min: number;
        max: number;
      };
      field?: string;
      order?: string;
    };
  };
};

type FilterAction = FilterTypeAction;

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
    filterTypes: [],
  },
  filterDispatch: () => {},
});

export const filterReducer = (state: FilterState, action: FilterAction) => {
  let filterTypes: FilterTypes[] = [];
  if (state.filterTypes) {
    filterTypes = [...state.filterTypes];
  }
  switch (action.type) {
    case "FILTER":
      const { filterTypeName, arg } = action.payload;
      if (!filterTypes.includes(filterTypeName as FilterTypes)) {
        filterTypes.push(filterTypeName as FilterTypes);
      }

      if (
        action.type === "FILTER" &&
        filterTypes.includes(filterTypeName as FilterTypes)
      ) {
        let updatedProducts = products["hydra:member"];
        if (
          filterTypes.includes(filterTypeName as FilterTypes) &&
          arg?.selectedType
        ) {
          updatedProducts = filterProductsByType(
            updatedProducts,
            categories["hydra:member"],
            arg.selectedType
          );
        } else if (
          filterTypes.includes(filterTypeName as FilterTypes) &&
          arg?.price
        ) {
          updatedProducts = filterProductsByPrice(
            updatedProducts,
            arg.price.min,
            arg.price.max
          );
        } else if (
          filterTypes.includes(filterTypeName as FilterTypes) &&
          arg?.inputValue
        ) {
          updatedProducts = filterProductsBySearch(
            updatedProducts,
            arg.inputValue
          );
        }

        if (
          filterTypes.includes(filterTypeName as FilterTypes) &&
          arg?.field &&
          arg?.order
        ) {
          updatedProducts = sortProducts(updatedProducts, arg.field, arg.order);
        }
        return {
          ...state,
          filteredProducts: updatedProducts,
          filterTypes,
        };
      }
      return state;
    default:
      return state;
  }
};

export default FilterContext;
