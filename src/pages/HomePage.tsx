import "../App.css";
import ProductList from "../component/catalog/products/ProductList";
import Filter from "../component/filter/Filter";

const HomePage = () => {
  return (
    <>
      <div className="flex container">
        <div className="w-1/3">
          <Filter />
        </div>
        <div className="w-2/3">
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default HomePage;
