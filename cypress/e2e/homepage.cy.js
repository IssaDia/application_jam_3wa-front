const user = {
  email: "test@cypress.com",
  password: "test-cypress",
};
describe("Example Test", () => {
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
  it("can register successfully", () => {
    cy.visit("/register");
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirmPassword"]').type(user.password);
    cy.get('input[name="agreeTerms"]').click({ force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.url().should("eq", `${Cypress.config().baseUrl}/expected-page`);
  });
  it("can login successfully", () => {
    cy.visit("/login");
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click({ force: true });
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
