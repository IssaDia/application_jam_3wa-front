import ProductList from "../component/catalog/products/ProductList";
import { render, screen, prettyDOM } from "@testing-library/react";
import { ProductContext } from "../component/catalog/products/context/ProductContext";

function renderProducts(data) {
  return render(
    <ProductContext.Provider value={{ products: data }}>
      <ProductList />
    </ProductContext.Provider>
  );
}

it("should display no matches found when no products", () => {
  const productList = render(<ProductList />);
  const noResultsMessage = "Il n'y a aucun résultat";
  const noResultsAssert = screen.getByText(noResultsMessage);

  expect(noResultsAssert).toBeTruthy();
  console.log(prettyDOM(productList.container));
});

it("should display a list of products", () => {
  //   const product = {
  //     "@id": "/api/products/1",
  //     "@type": "Product",
  //     id: 1,
  //     name: "Cerises",
  //     image: "cerises.jpeg",
  //     price: 390,
  //     quantity: 14,
  //   };
  //   renderProducts(product);
});
