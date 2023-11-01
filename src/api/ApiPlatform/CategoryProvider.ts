import { ApiClient } from "../dataProvider";
import { Category } from "../../useCases/entities";
import { withApiMiddleware } from "../middleware";
import { apiRequest } from "../apiService.js";

class CategoryApiClient implements ApiClient {
  async getCategories(): Promise<Category[]> {
    const categoriesEndpoint = "/categories";

    const categoryRequest = withApiMiddleware((token: string) =>
      apiRequest(categoriesEndpoint, "GET", null, token)
    );

    return await categoryRequest();
  }
}

export default CategoryApiClient;
