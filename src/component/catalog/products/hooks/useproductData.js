import { useProductContext } from "../context/ProductContext";

export const useProductData = () => {
  return useProductContext();
};
