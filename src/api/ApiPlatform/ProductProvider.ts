import { ApiClient } from "../dataProvider";
import { Product } from "../../useCases/entities";
import { withApiMiddleware } from "../middleware.js";
import { apiRequest } from "../apiService.js";

class ProductApiClient implements ApiClient {
  async getProducts(): Promise<Product[]> {
    const productsEndpoint = "/products";

    const productRequest = withApiMiddleware((token: string) =>
      apiRequest(productsEndpoint, "GET", null, token)
    );

    return await productRequest();
  }
}

export default ProductApiClient;
