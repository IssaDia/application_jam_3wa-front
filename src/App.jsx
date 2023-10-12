import { useState, useEffect, useReducer } from "react";
import Navbar from "./component/nav/Navbar";
import "./App.css";
import ProductList from "./component/catalog/products/ProductList";
import { fetchProducts } from "./component/catalog/products/services/productService";
import ProductContext from "./component/catalog/products/context/ProductContext";
import { cartReducer } from "./component/cart/context/CartContext";
import { CartContext } from "./component/cart/context/CartContext";

const initialState = {
  cart: [],
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
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
  return (
    <>
      <CartContext.Provider value={{ state, dispatch }}>
        <ProductContext.Provider value={{ products, isLoading, isError }}>
          <div className="h-full w-full m-0">
            <Navbar />
          </div>
          <div className="flex container">
            <div className="w-1/3">2</div>
            <div className="w-2/3">
              <ProductList />
            </div>
          </div>
        </ProductContext.Provider>
      </CartContext.Provider>
    </>
  );
};

export default App;
