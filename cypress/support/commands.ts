/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login with username and password
       * @example cy.login('tomsmith', 'SuperSecretPassword!')
       */
      login(username: string, password: string): Chainable<void>;
      
      /**
       * Custom command to check if element contains text
       * @example cy.containsText('.message', 'Success')
       */
      containsText(selector: string, text: string): Chainable<void>;
      
      /**
       * Custom command to fill form field with validation
       * @example cy.fillField('#username', 'testuser')
       */
      fillField(selector: string, value: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('containsText', (selector: string, text: string) => {
  cy.get(selector).should('contain.text', text);
});

Cypress.Commands.add('fillField', (selector: string, value: string) => {
  cy.get(selector).clear().type(value);
});

export {};

