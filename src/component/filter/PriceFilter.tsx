import { useContext, useEffect, useState } from "react";
import Switch from "react-switch";
import { ProductContext } from "../catalog/products/context/ProductContext";
import FilterContext from "./context/FilterContext";

export interface PriceRange {
  min: number;
  max: number;
}

const PriceFilter = () => {
  const [enabled, setEnabled] = useState(false);

  const { filterDispatch } = useContext(FilterContext);

  const { products, isFiltering, setIsFiltering } = useContext(ProductContext);

  const minimumPrice = Math.min(...products.map((product) => product.price));
  const maximumPrice = Math.max(...products.map((product) => product.price));

  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: minimumPrice,
    max: maximumPrice,
  });

  useEffect(() => {
    if (products.length > 0) {
      setPriceRange({
        min: minimumPrice,
        max: maximumPrice,
      });
    }
  }, [products]);

  const handleSwitchChange = (checked: boolean) => {
    setEnabled(checked);
    setIsFiltering(!isFiltering);
    filterDispatch({
      type: "FILTER_BY_PRICE",
      payload: {
        min: minimumPrice,
        max: maximumPrice,
      },
    });
    if (!checked) {
      // If the switch is turned off, reset the price filter
      setIsFiltering(!isFiltering);
      setPriceRange({ min: minimumPrice, max: maximumPrice });
      filterDispatch({
        type: "INITIALIZE_FILTER",
      });
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let updatedMin = priceRange.min;
    let updatedMax = priceRange.max;

    if (name === "min") {
      updatedMin = parseInt(value, 10);
    } else if (name === "max") {
      updatedMax = parseInt(value, 10);
    }

    setPriceRange({
      min: updatedMin,
      max: updatedMax,
    });

    filterDispatch({
      type: "FILTER_BY_PRICE",
      payload: {
        min: updatedMin,
        max: updatedMax,
      },
    });
    // setIsFiltering(true); // Set isFiltered to true when applying a filter
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Price Range</h3>
      <div className="flex items-center space-x-2 mb-2">
        <span className="mr-2">Filter:</span>
        <Switch
          onChange={handleSwitchChange}
          checked={enabled}
          className="react-switch"
          id="price-filter-switch"
        />
      </div>
      {enabled && (
        <div className="flex space-x-2">
          <input
            type="number"
            name="min"
            value={enabled ? priceRange.min : 0}
            onChange={handlePriceChange}
            className="w-1/2 border rounded px-2 py-1"
          />
          <input
            type="number"
            name="max"
            value={enabled ? priceRange.max : 0}
            onChange={handlePriceChange}
            className="w-1/2 border rounded px-2 py-1"
          />
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
