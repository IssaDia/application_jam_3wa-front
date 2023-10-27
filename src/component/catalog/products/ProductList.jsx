import { useContext, useEffect, useState } from "react";
import { ProductContext } from "./context/ProductContext";
import Card from "../../ui/Card";
import SearchContext from "../../search/context/SearchContext";

const ProductList = () => {
  const { isLoading, isError } = useContext(ProductContext);
  const { searchState } = useContext(SearchContext);
  const { productState } = useContext(ProductContext);

  let productsList = productState.products;

  if (searchState.filtering) {
    productsList = searchState.filteredProducts;
  }

  if (searchState.filtering && searchState.filteredProducts.length === 0) {
    return <p>No matches found</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading products</p>;
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
