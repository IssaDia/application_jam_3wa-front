import { useState } from "react";
import { RegisterUseCase, LoginUseCase } from "../useCases/useCases";
import { User } from "../useCases/entities";

const useAuth = (
  loginUseCase: LoginUseCase,
  registerUseCase: RegisterUseCase
) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();

  const login = async (email: string, password: string) => {
    try {
      const { token } = await loginUseCase.login(email, password);

      setToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (user: User) => {
    try {
      const response = await registerUseCase.register(user);
      setUser(response.user);
    } catch (error) {
      console.log(error);
    }
  };
  return { login, register, user, token };
};

export default useAuth;
