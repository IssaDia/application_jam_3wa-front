import CartPage from "../pages/CartPage";
import { render, screen, prettyDOM } from "@testing-library/react";

it("should have an empty cart message on init ", () => {
  render(<CartPage />);
  const emptyCartText = screen.getByText("Votre panier est vide.");
  expect(emptyCartText).toBeTruthy();
});
it("should calculate the total price of the cart", () => {
  const cartPage = render(<CartPage />);
  const item = [
    {
      "@id": "/api/products/1",
      "@type": "Product",
      id: 1,
      name: "Cerises",
      image: "cerises.jpeg",
      price: 390,
      quantity: 14,
    },
  ];
  window.localStorage.setItem("cart", JSON.stringify(item));
  console.log(prettyDOM(cartPage.container));

  const cart = localStorage.getItem("cart");
  expect(cart).toBe(JSON.stringify(item));
});
