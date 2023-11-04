import { useContext, useEffect } from "react";
import useFetchProducts from "../../hooks/useFetchProducts";
import { ProductContext } from "../catalog/products/context/ProductContext";
import FilterContext from "../filter/context/FilterContext";
const Searchbar = () => {
  const { filterDispatch } = useContext(FilterContext);
  const { setIsFiltering } = useContext(ProductContext);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setIsFiltering(true);
    filterDispatch({
      type: "FILTER",
      payload: { filterTypeName: "search", arg: { inputValue: inputValue } },
    });
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
