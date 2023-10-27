import { useContext, useEffect } from "react";
import useFetchProducts from "../../hooks/useFetchProducts";
import { ProductContext } from "../catalog/products/context/ProductContext";
import SearchContext from "./context/SearchContext";

const Searchbar = () => {
  const { searchDispatch } = useContext(SearchContext);
  const { productState } = useContext(ProductContext);

  const products = productState.products;

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    searchDispatch({ type: "FILTER", payload: { inputValue, products } });
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Recherche"
        className="bg-gray-700 text-white px-2 py-1"
        onChange={(event) => handleInputChange(event)}
      />
      <button className="bg-gray-700 text-white px-2 py-1">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default Searchbar;
