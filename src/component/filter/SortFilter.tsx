import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../catalog/products/context/ProductContext";
import FilterContext from "./context/FilterContext";

const SortFilter = () => {
  const { filterDispatch } = useContext(FilterContext);
  const [sortOption, setSortOption] = useState("name_asc");

  const { isFiltering, setIsFiltering } = useContext(ProductContext);

  useEffect(() => {
    setIsFiltering(true);
    filterDispatch({
      type: "FILTER",
      payload: {
        filterTypeName: "sort",
        arg: {
          field: "name",
          order: "asc",
        },
      },
    });
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSortOption(value);
    setIsFiltering(true);

    const [field, order] = value.split("_");

    filterDispatch({
      type: "FILTER",
      payload: {
        filterTypeName: "sort",
        arg: {
          field,
          order,
        },
      },
    });
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Sort Products</h3>
      <div className="flex items-center space-x-2 mb-2">
        <span className="mr-2">Sort by:</span>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border rounded px-2 py-1"
        >
          <option value="name_asc">Name (A-Z)</option>
          <option value="name_desc">Name (Z-A)</option>
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default SortFilter;
