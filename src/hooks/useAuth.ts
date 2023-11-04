import { useState } from "react";
import { AuthUseCase } from "../useCases/useCases";
import { User, AuthenticatedUser } from "../useCases/entities";
import jwt_decode from "jwt-decode";

const useAuth = (authUseCase: AuthUseCase) => {
  const [user, setUser] = useState<AuthenticatedUser>();
  const [token, setToken] = useState<string>();

  const login = async (email: string, password: string) => {
    try {
      const { token } = await authUseCase.login(email, password);
      const decodedUser = jwt_decode<AuthenticatedUser>(token);
      setUser(decodedUser);
      setToken(token);
      return { token: token, user: decodedUser };
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (user: User) => {
    try {
      await authUseCase.register(user);
    } catch (error) {
      console.log(error);
    }
  };
  return { login, register, user, token };
};

export default useAuth;
