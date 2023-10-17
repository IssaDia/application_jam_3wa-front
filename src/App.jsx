import "./App.css";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./component/nav/Navbar";
import { useEffect, useReducer } from "react";
import { cartReducer, CartContext } from "./component/cart/context/CartContext";
import AuthContext from "./component/auth/context/AuthContext";
import ProductContext from "./component/catalog/products/context/ProductContext";
import useFetchProducts from "./hooks/useFetchProducts";
import useAuth from "./hooks/useAuth";
import ProductApiClient from "./api/ApiPlatform/ProductProvider";
import {
  ProductUseCaseImpl,
  LoginUseCaseImpl,
  RegisterUseCaseImpl,
} from "./usecases/useCases";
import AuthApiClient from "./api/ApiPlatform/AuthProvider";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const productApiClient = new ProductApiClient();
  const authApiClient = new AuthApiClient();
  const productUseCase = new ProductUseCaseImpl(productApiClient);
  const loginUseCase = new LoginUseCaseImpl(authApiClient);
  const registerUseCase = new RegisterUseCaseImpl(authApiClient);
  const { products, isLoading, isError } = useFetchProducts(productUseCase);
  const { user, login, register } = useAuth(loginUseCase, registerUseCase);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <AuthContext.Provider value={{ user, login, register }}>
        <CartContext.Provider value={{ state, dispatch }}>
          <ProductContext.Provider value={{ products, isLoading, isError }}>
            <BrowserRouter>
              <nav>
                <Navbar />
                {/* {test} */}
              </nav>
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </main>
            </BrowserRouter>
          </ProductContext.Provider>
        </CartContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
