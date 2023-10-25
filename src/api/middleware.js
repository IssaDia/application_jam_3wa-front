import AuthApiClient from "./ApiPlatform/AuthProvider";

export function withApiMiddleware(interactor) {
  return async function () {
    try {
      const authApiClient = new AuthApiClient();
      const username = import.meta.env.VITE_API_USERNAME;
      const password = import.meta.env.VITE_API_PASSWORD;
      const response = await authApiClient.getToken(username, password);
      if (response.token) {
        const result = await interactor(response.token);
        return result;
      }
    } catch (error) {
      // Handle API errors
      throw new Error(error);
    }
  };
}
