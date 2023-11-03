import { useEffect, useState } from "react";
import ProductApiClient from "../api/ApiPlatform/ProductProvider";
import { ProductUseCaseImpl } from "../useCases/useCases";
import useFetchProducts from "./useFetchProducts";

const useSearch = () => {
  const productApiClient = new ProductApiClient();
  const productUseCase = new ProductUseCaseImpl(productApiClient);
  const { products } = useFetchProducts();

  const [searchInput, setSearchInput] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filtered = products.filter((product: any) =>
      product.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchInput]);

  return { filteredProducts, setSearchInput };
};

export default useSearch;
