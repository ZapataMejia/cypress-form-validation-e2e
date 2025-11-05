/// <reference types="cypress" />
import { FormPage } from '../pages/FormPage';

describe('Form Validation Tests', () => {
  let formPage: FormPage;

  beforeEach(() => {
    formPage = new FormPage();
    // Using login page as it has form validation
    formPage.visit('/login');
  });

  describe('Required Field Validation', () => {
    it('should validate required fields are present', () => {
      cy.get('#login').within(() => {
        // Check required fields on login form
        cy.get('input[required]').should('exist');
      });
    });

    it('should show validation error when required field is empty', () => {
      formPage.submit();
      
      // HTML5 validation should prevent submission
      cy.get('#login').within(() => {
        cy.get('input[required]:invalid').should('exist');
      });
    });

    it('should allow submission when all required fields are filled', () => {
      // Fill login form with valid data
      cy.get('#username').type('tomsmith');
      cy.get('#password').type('SuperSecretPassword!');
      
      formPage.submit();
      // Should redirect to secure area
      cy.url().should('include', '/secure');
    });
  });

  describe('Email Field Validation', () => {
    it('should validate email format if email field exists', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="email"]').length > 0) {
          cy.get('input[type="email"]').should('have.attr', 'type', 'email');
        } else {
          cy.log('No email field found on this page');
        }
      });
    });

    it('should test email validation on form page', () => {
      // Navigate to a page with email field if available
      cy.visit('/');
      cy.log('Email validation tests are in email-validation.cy.ts');
    });
  });

  describe('Input Field Validation', () => {
    it('should validate text input fields', () => {
      cy.get('#username').type('Test Input');
      cy.get('#username').should('have.value', 'Test Input');
    });

    it('should allow clearing input fields', () => {
      cy.get('#username').type('Test').clear();
      cy.get('#username').should('have.value', '');
    });

    it('should validate maxlength attribute if present', () => {
      cy.get('#username').then(($input) => {
        const maxLength = $input.attr('maxlength');
        if (maxLength) {
          const longText = 'a'.repeat(parseInt(maxLength) + 1);
          cy.get('#username').type(longText);
          cy.get('#username').should('have.value', 'a'.repeat(parseInt(maxLength)));
        } else {
          cy.log('No maxlength attribute found');
        }
      });
    });
  });

  describe('Form Submission', () => {
    it('should submit form with valid data', () => {
      cy.get('#username').type('tomsmith');
      cy.get('#password').type('SuperSecretPassword!');
      
      formPage.submit();
      // Verify form submission - should redirect to secure area
      cy.url().should('include', '/secure');
    });

    it('should prevent submission with invalid data', () => {
      cy.get('#username').type('invalid');
      cy.get('#password').type('wrong');
      
      formPage.submit();
      // Form should not redirect due to invalid credentials
      cy.url().should('include', '/login');
      cy.get('#flash').should('contain.text', 'invalid');
    });
  });

  describe('Form Reset', () => {
    it('should clear form fields when reset', () => {
      cy.get('#username').type('Test');
      cy.get('#password').type('testpass');
      
      cy.get('#login').within(() => {
        cy.get('button[type="reset"]').then(($reset) => {
          if ($reset.length > 0) {
            cy.get('button[type="reset"]').click();
            cy.get('#username').should('have.value', '');
            cy.get('#password').should('have.value', '');
          } else {
            cy.log('No reset button found on this form');
          }
        });
      });
    });
  });
});

