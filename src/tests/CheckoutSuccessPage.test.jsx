import { render, screen, prettyDOM } from "@testing-library/react";
import CheckoutSuccessPage from "../pages/CheckoutSuccessPage";

it("should display an Success message on page", () => {
  render(<CheckoutSuccessPage />);
  const checkoutSuccessMessage =
    "Merci pour votre paiement. Votre commande est confirmée.";
  const aboutAnchorNode = screen.getByText(checkoutSuccessMessage);

  expect(aboutAnchorNode).toBeTruthy();
});
