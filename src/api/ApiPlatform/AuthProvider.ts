import { AuthResponse, User } from "../../useCases/entities";
import { ApiClient } from "../dataProvider";

class AuthApiClient implements ApiClient {
  async loginUser(data: any): Promise<AuthResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch auth");
    }
    return response.json();
  }

  async registerUser(user: User): Promise<User> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    return response.json();
  }
}

export default AuthApiClient;
