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

import {
  productReducer,
  ProductContext,
} from "./component/catalog/products/context/ProductContext";
import useFetchProducts from "./hooks/useFetchProducts";

import jwt_decode from "jwt-decode";
import SearchContext, {
  searchReducer,
} from "./component/search/context/SearchContext";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart") as string) || [],
};

const authInitialState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const productInitialState = {
  products: [],
  isLoading: true,
  isError: false,
};

const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [productState, productDispatch] = useReducer(
    productReducer,
    productInitialState
  );

  const searchInitialState = {
    products: productState,
    filteredProducts: [],
  };
  const [searchState, searchDispatch] = useReducer(
    searchReducer,
    searchInitialState
  );

  const { products } = useFetchProducts();

  useEffect(() => {
    // dispatch("LOAD_CART");
    productDispatch({ type: "PRODUCTS_LOADED", payload: products });

    const token = localStorage.getItem("token");

    if (token) {
      const decodedUser = jwt_decode(token);
      const expirationTime = decodedUser.exp * 1000;
      console.log(expirationTime);

      if (expirationTime < Date.now()) {
        authDispatch({ type: "LOGOUT" });
      }
    }
  }, [products]);

  return (
    <>
      <AuthContext.Provider value={{ authState, authDispatch }}>
        <CartContext.Provider value={{ state, dispatch }}>
          <ProductContext.Provider value={{ productState, productDispatch }}>
            <SearchContext.Provider value={{ searchState, searchDispatch }}>
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
            </SearchContext.Provider>
          </ProductContext.Provider>
        </CartContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
