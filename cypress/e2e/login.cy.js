const user = {
  email: "test@cypress.com",
  password: "test-cypress",
};
describe("Login", () => {
  it("can login successfully", () => {
    cy.visit("/login");
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click({ force: true });
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
