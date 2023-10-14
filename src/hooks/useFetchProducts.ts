import { useEffect, useState } from "react";
import { ProductUseCase } from "../useCases/useCases";
import { Product } from "../useCases/entities";

const useFetchProducts = (productUseCase: ProductUseCase) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productUseCase.getProducts();
        setProducts(data);
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
