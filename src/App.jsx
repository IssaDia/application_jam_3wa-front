import "./App.css";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./component/nav/Navbar";
import { useEffect, useReducer } from "react";
import { cartReducer, CartContext } from "./component/cart/context/CartContext";
import ProductContext from "./component/catalog/products/context/ProductContext";
import useFetchProducts from "./hooks/useFetchProducts";
import ProductApiClient from "./api/ApiPlatform/ProductProvider";
import { ProductUseCaseImpl } from "./usecases/useCases";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const productApiClient = new ProductApiClient();
  const productUseCase = new ProductUseCaseImpl(productApiClient);
  const { products, isLoading, isError } = useFetchProducts(productUseCase);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <CartContext.Provider value={{ state, dispatch }}>
        <ProductContext.Provider value={{ products, isLoading, isError }}>
          <BrowserRouter>
            <nav>
              <NavLink to="/cart">Home</NavLink>
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
    </>
  );
};

export default App;
