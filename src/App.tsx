import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import Navbar from "./component/nav/Navbar";
import { useEffect, useReducer, useState } from "react";
import { cartReducer, CartContext } from "./component/cart/context/CartContext";
import { authReducer, AuthContext } from "./component/auth/context/AuthContext";

import { ProductContext } from "./component/catalog/products/context/ProductContext";
import useFetchProducts from "./hooks/useFetchProducts";

import jwt_decode from "jwt-decode";
import FilterContext, {
  filterReducer,
} from "./component/filter/context/FilterContext";
import { Product } from "./useCases/entities";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const cartInitialState = {
  cart: JSON.parse(localStorage.getItem("cart") as string) || [],
};

const authInitialState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const filterInitialState = {
  filteredProducts: [],
  categories: [],
};

const App = () => {
  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    filterInitialState
  );
  const { productsFromApi } = useFetchProducts();

  const [products, setProducts] = useState<Product[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setProducts(productsFromApi);
    setIsFiltering(false);

    const token = localStorage.getItem("token");

    if (token) {
      const decodedUser: any = jwt_decode(token);
      const expirationTime = decodedUser.exp * 1000;

      if (expirationTime < Date.now()) {
        authDispatch({ type: "LOGOUT" });
      }
    }
  }, [products]);

  return (
    <>
      <AuthContext.Provider value={{ authState, authDispatch }}>
        <CartContext.Provider value={{ cartState, cartDispatch }}>
          <ProductContext.Provider
            value={{ products: productsFromApi, isFiltering, setIsFiltering }}
          >
            <FilterContext.Provider
              value={{
                filterState,
                filterDispatch,
              }}
            >
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
                    <Route path="/checkout" element={<CheckoutPage />} />
                  </Routes>
                </main>
              </BrowserRouter>
            </FilterContext.Provider>
          </ProductContext.Provider>
        </CartContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
