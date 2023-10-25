import { AuthResponse, User } from "../../useCases/entities";
import { ApiClient } from "../dataProvider";
import { withApiMiddleware } from "../middleware.js";
import { apiRequest } from "../apiService.js";

class AuthApiClient implements ApiClient {
  async getToken(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/login_check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }

  async loginUser(email: string, password: string): Promise<AuthResponse> {
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    //   },
    //   body: JSON.stringify({ email, password }),
    // });
    // if (!response.ok) {
    //   throw new Error("Failed to fetch auth");
    // }
    // console.log("Response status:", response.status);
    // const responseText = await response.text(); // Read the response text

    // try {
    //   return JSON.parse(responseText); // Parse the JSON from the response text
    // } catch (error) {
    //   throw new Error("Failed to parse JSON response");
    // }

    const data = {
      email,
      password,
    };

    try {
      const loginEndpoint = "/login";

      const loginRequest = withApiMiddleware((token: string) =>
        apiRequest(loginEndpoint, "POST", data, token)
      );

      return await loginRequest();
    } catch (error) {
      throw new Error("Failed to parse JSON response");
    }
  }

  async registerUser(data: User): Promise<User> {
    try {
      const signupEndpoint = "/signup";

      const signupRequest = withApiMiddleware((token: string) =>
        apiRequest(signupEndpoint, "POST", data, token)
      );

      return await signupRequest();
    } catch (error) {
      throw new Error("Failed to signup user");
    }
  }
}

export default AuthApiClient;
