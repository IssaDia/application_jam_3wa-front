import { createContext } from "react";

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
};

type User = {
  id: number;
  username: string;
};

type AuthAction =
  | { type: "LOGIN"; payload: { token: string; user: User } }
  | { type: "LOGOUT" };

export const AuthContext = createContext<{
  authState: AuthState;
  authDispatch: React.Dispatch<AuthAction>;
}>({
  authState: {
    token: null,
    user: null,
    isAuthenticated: false,
  },
  authDispatch: () => {},
});

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case "LOGOUT":
      console.log("Logging out");
      localStorage.setItem("token", "");

      return {
        token: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
