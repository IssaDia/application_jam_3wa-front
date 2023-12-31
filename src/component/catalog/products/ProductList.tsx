import { useContext } from "react";
import { ProductContext } from "./context/ProductContext";
import Card from "../../ui/Card";
import FilterContext from "../../filter/context/FilterContext";

const ProductList = () => {
  const { products, isFiltering } = useContext(ProductContext);
  const { filterState } = useContext(FilterContext);

  let productsList = products;

  if (isFiltering) {
    productsList = filterState.filteredProducts;
  }

  if (isFiltering && filterState.filteredProducts.length === 0) {
    return <p>Il n'y a aucun résultat</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {productsList.map((product) => (
        <div key={product.id} className="w-full">
          <Card
            key={product.id}
            image={product.image}
            title={product.name}
            price={product.price}
            product={product}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
