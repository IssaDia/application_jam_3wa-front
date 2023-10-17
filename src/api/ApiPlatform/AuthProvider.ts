import { AuthResponse, User } from "../../useCases/entities";
import { ApiClient } from "../dataProvider";

class AuthApiClient implements ApiClient {
  async loginUser(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch auth");
    }
    console.log("Response status:", response.status);
    const responseText = await response.text(); // Read the response text

    try {
      return JSON.parse(responseText); // Parse the JSON from the response text
    } catch (error) {
      throw new Error("Failed to parse JSON response");
    }
  }

  async registerUser(data: User): Promise<User> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    return response.json();
  }
}

export default AuthApiClient;
