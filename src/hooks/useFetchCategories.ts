import { useEffect, useState } from "react";
import { CategoryUseCaseImpl } from "../useCases/useCases"; // Import the CategoryUseCase
import { Category } from "../useCases/entities"; // Import the Category type
import CategoryApiClient from "../api/ApiPlatform/CategoryProvider"; // Import the Category API client

const useFetchCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const categoryApiClient = new CategoryApiClient();
  const categoryUseCase = new CategoryUseCaseImpl(categoryApiClient);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoryUseCase.getCategories();
        setCategories(data["hydra:member"]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categories, isLoading, isError };
};

export default useFetchCategories;
