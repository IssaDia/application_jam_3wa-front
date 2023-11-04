import PriceFilter from "./PriceFilter";
import SortFilter from "./SortFilter";
import TypeFilter from "./TypeFilter";

const Filter = () => {
  return (
    <div>
      <div className=" bg-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <PriceFilter />
        <TypeFilter />
        <SortFilter />
      </div>
    </div>
  );
};

export default Filter;
