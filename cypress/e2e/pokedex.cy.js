/// <reference types="cypress" />

describe("pokedex app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("displays loader while data is charging", () => {
    let sendResponse;
    const trigger = new Promise((resolve) => {
      sendResponse = resolve;
    });

    cy.get('[data-cy="loader"]').should("have.length", 1);
    cy.intercept("data-url", (request) => {
      return trigger.then(() => {
        request.reply();
      });
    });
    cy.get('[data-cy="loader"]').then(() => {
      sendResponse();
      cy.get('[data-cy="loader"]').should("not.exist");
      cy.get('[data-cy="genericTable"]').should("have.length", 1);
    });
  });

  it("displays next button", () => {
    cy.get('[data-cy="button-component"]').should("have.length", 1);
  });

  it("when clicking on Next, call is made, new info loads and previous button appears", () => {
    cy.get('[data-cy="button-component"]').click();
    let sendResponse;
    const trigger = new Promise((resolve) => {
      sendResponse = resolve;
    });
    cy.intercept("data-url", (request) => {
      return trigger.then(() => {
        request.reply();
      });
    });
    cy.get('[data-cy="button-component"]').then(() => {
      sendResponse();
      cy.get('[data-cy="button-component"]').should("have.length", 2);
    });
  });

  it("when clicking on pokemon list, a table should be rendered with the selected pokemons", () => {
    cy.get('[data-cy="genericTableRow"').should("have.length", 20);
    cy.get('[data-cy="genericTableRow"').first().click();
    cy.get('[data-cy="genericTable"').should("have.length", 2);
  });
});
