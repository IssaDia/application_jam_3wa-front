import { useContext } from "react";
import ProductContext from "./context/ProductContext";
import Card from "../../ui/Card";

const ProductList = () => {
  const { products, isLoading, isError } = useContext(ProductContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading products</p>;
  }
  console.log(products);
  const productsArray = products["hydra:member"];

  return (
    <div className="grid grid-cols-3 gap-4">
      {productsArray.map((product) => (
        <div key={product.id} className="w-full">
          <Card
            key={product.id}
            image={product.image}
            title={product.name}
            price={product.price}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
