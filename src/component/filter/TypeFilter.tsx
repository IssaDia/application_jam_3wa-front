import { useContext, useEffect, useState } from "react";
import Switch from "react-switch";
import useFetchCategories from "../../hooks/useFetchCategories";
import { Category } from "../../useCases/entities";
import { ProductContext } from "../catalog/products/context/ProductContext";
import FilterContext from "./context/FilterContext";

enum Type {
  INTENSE = "intense",
  CONFITURE = "confiture",
  GELEE = "gelee",
  FRUITS_ROUGES = "fruits rouges",
}

type ProductType = keyof typeof Type;

const TypeFilter = () => {
  const [enabled, setEnabled] = useState(false);
  const { filterDispatch } = useContext(FilterContext);

  const { products, isFiltering, setIsFiltering } = useContext(ProductContext);

  const categoriesFromApi = useFetchCategories();

  const availableTypes = [
    ...new Set(
      categoriesFromApi.categories.map((category: Category) => {
        return category.name;
      })
    ),
  ];

  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    if (products.length > 0) {
      setSelectedType("");
    }
    filterDispatch({
      type: "FILTER_BY_TYPE",
      payload: {
        type: selectedType,
      },
    });
  }, [products]);

  const handleSwitchChange = (checked: boolean) => {
    setEnabled(checked);
    setIsFiltering(!isFiltering);
    filterDispatch({
      type: "FILTER_BY_TYPE",
      payload: {
        type: selectedType,
      },
    });

    if (!checked) {
      setIsFiltering(!isFiltering);
      filterDispatch({
        type: "INITIALIZE_FILTER",
      });
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setSelectedType(selectedValue);
    filterDispatch({
      type: "FILTER_BY_TYPE",
      payload: {
        type: selectedValue,
      },
    });
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Type Filter</h3>
      <div className="flex items-center space-x-2 mb-2">
        <span className="mr-2">Filter:</span>
        <Switch
          onChange={handleSwitchChange}
          checked={enabled}
          className="react-switch"
          id="type-filter-switch"
        />
      </div>
      {enabled && (
        <div className="flex space-x-2">
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="w-1/2 border rounded px-2 py-1"
          >
            <option value="">Select Type</option>
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default TypeFilter;
