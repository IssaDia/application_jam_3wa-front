import "./App.css";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./component/nav/Navbar";
import { useState, useEffect, useReducer } from "react";
import { cartReducer, CartContext } from "./component/cart/context/CartContext";
import ProductContext from "./component/catalog/products/context/ProductContext";
import { fetchProducts } from "./component/catalog/products/services/productService";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      {/* <Navbar /> */}
      <CartContext.Provider value={{ state, dispatch }}>
        <ProductContext.Provider value={{ products, isLoading, isError }}>
          <BrowserRouter>
            <NavLink to="/cart">Home</NavLink>
            <Navbar />
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
    </>
  );
};

export default App;
