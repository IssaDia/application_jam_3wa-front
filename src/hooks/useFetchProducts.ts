import { useEffect, useState } from "react";
import { ProductUseCaseImpl } from "../useCases/useCases";
import { Product } from "../useCases/entities";
import ProductApiClient from "../api/ApiPlatform/ProductProvider";

const useFetchProducts = () => {
  const [productsFromApi, setProductsFromApi] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const productApiClient = new ProductApiClient();
  const productUseCase = new ProductUseCaseImpl(productApiClient);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productUseCase.getProducts();
        setProductsFromApi(data["hydra:member"]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { productsFromApi, isLoading, isError };
};

export default useFetchProducts;
