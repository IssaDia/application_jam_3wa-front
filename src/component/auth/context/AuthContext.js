import { createContext } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        token: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
