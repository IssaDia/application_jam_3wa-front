import { useContext } from "react";
import ProductContext from "./context/ProductContext";

const ProductList = () => {
  const { products, isLoading, isError } = useContext(ProductContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading products</p>;
  }

  console.log("products", products["hydra:member"]);

  return (
    <div>
      {/* {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      ))} */}
    </div>
  );
};

export default ProductList;
