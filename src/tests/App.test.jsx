import App from "../App";
import { render, screen, prettyDOM } from "@testing-library/react";
import { beforeAll, expect } from "vitest";

beforeAll(() => {
  render(<App />);
});

it("App Initial State - Empty Cart", () => {
  const cart = localStorage.getItem("cart");
  expect(cart).toBe(null);
});

it("App Initial State - Empty Auth", () => {
  const token = localStorage.getItem("token");
  expect(token).toBe(null);
});

it("App Initial State - Cart with items", () => {
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

  const cart = localStorage.getItem("cart");
  expect(cart).toBe(JSON.stringify(item));
});

it("App Initial State -  Authenticated", () => {
  window.localStorage.setItem("token", "token_test");
  const token = localStorage.getItem("token");
  expect(token).toBe(token);
});
