import { ApiClient } from "../dataProvider";
import { Product } from "../../useCases/entities";

class ProductApiClient implements ApiClient {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }
}

export default ProductApiClient;
