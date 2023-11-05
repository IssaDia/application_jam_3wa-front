const user = {
  email: "test@cypress.com",
  password: "test-cypress",
};
describe("Homepage", () => {
  it("displays the right number elements when filtering by price", () => {
    cy.visit("/");
    cy.get('[data-test="product-card"]').should("have.length", 12);
    cy.wait(3000);
    cy.get("#price-filter-switch").click({ force: true });
    cy.get('input[name="max"]').type("{downarrow}", { force: true });
    cy.get('[data-test="product-card"]').should("have.length", 11);
  });
  it("add element to the cart when adding product", () => {
    cy.visit("/");
    cy.wait(3000);
    cy.get('[data-test="add-product-btn"]').first().click();
    cy.get('[data-test="add-product-cart-btn"]').first().click();
    cy.wait(3000);
    cy.get('[data-test="cart-quantity"]').should("have.text", "(1)");
  });
});
