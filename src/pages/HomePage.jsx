import { useEffect, useReducer } from "react";
import "../App.css";
import ProductList from "../component/catalog/products/ProductList";
import { cartReducer } from "../component/cart/context/CartContext";
import React from "react";

const initialState = {
  cart: [],
};

const HomePage = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <div className="flex container">
        <div className="w-1/3">2</div>
        <div className="w-2/3">
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default HomePage;
