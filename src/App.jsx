import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./component/nav/Navbar";
import { useEffect, useReducer } from "react";
import { cartReducer, CartContext } from "./component/cart/context/CartContext";
import { authReducer, AuthContext } from "./component/auth/context/AuthContext";

import ProductContext from "./component/catalog/products/context/ProductContext";
import useFetchProducts from "./hooks/useFetchProducts";
import ProductApiClient from "./api/ApiPlatform/ProductProvider";
import { ProductUseCaseImpl } from "./usecases/useCases";

import jwt_decode from "jwt-decode";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const authInitialState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  const productApiClient = new ProductApiClient();
  const productUseCase = new ProductUseCaseImpl(productApiClient);
  const { products, isLoading, isError } = useFetchProducts(productUseCase);

  useEffect(() => {
    dispatch("LOAD_CART");
    const token = localStorage.getItem("token");

    if (token) {
      const decodedUser = jwt_decode(token);
      const expirationTime = decodedUser.exp * 1000;

      if (expirationTime < Date.now()) {
        authDispatch({ type: "LOGOUT" });
      }
    }
  }, [state]);

  return (
    <>
      <AuthContext.Provider value={{ authState, authDispatch }}>
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
