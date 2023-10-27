import { useEffect, useState } from "react";
import { ProductUseCase, ProductUseCaseImpl } from "../useCases/useCases";
import { Product } from "../useCases/entities";
import ProductApiClient from "../api/ApiPlatform/ProductProvider";

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const productApiClient = new ProductApiClient();
  const productUseCase = new ProductUseCaseImpl(productApiClient);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productUseCase.getProducts();
        setProducts(data["hydra:member"]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, isLoading, isError };
};

export default useFetchProducts;
