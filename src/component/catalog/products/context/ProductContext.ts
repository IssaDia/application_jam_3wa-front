import { createContext, Dispatch } from "react";
import { Product } from "../../../../useCases/entities";

type ProductContext = {
  products: Product[];
  isFiltering: boolean;
  setIsFiltering: Dispatch<React.SetStateAction<boolean>>;
};

export const ProductContext = createContext<ProductContext>({
  products: [],
  isFiltering: true,
  setIsFiltering: () => {},
});
