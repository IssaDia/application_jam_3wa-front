import { render, screen, prettyDOM } from "@testing-library/react";
import CheckoutErrorPage from "../pages/CheckoutErrorPage";

it("should display an error message on page", () => {
  render(<CheckoutErrorPage />);
  const checkoutErrorMessage =
    "Oops, il y a une erreur avec votre paiement. Merci d'essayer plus tard.";
  const errorMessageAssert = screen.getByText(checkoutErrorMessage);

  expect(errorMessageAssert).toBeTruthy();
});
