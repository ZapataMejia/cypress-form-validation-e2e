/// <reference types="cypress" />
import { LoginPage } from '../pages/LoginPage';

describe('Login Form Validation', () => {
  let loginPage: LoginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    loginPage.visit();
  });

  describe('Successful Login Flow', () => {
    it('should successfully login with valid credentials', () => {
      loginPage.login('tomsmith', 'SuperSecretPassword!');
      loginPage.verifyRedirectAfterLogin();
      loginPage.verifySuccessMessage('You logged into a secure area!');
    });

    it('should display success message after valid login', () => {
      loginPage.fillUsername('tomsmith');
      loginPage.fillPassword('SuperSecretPassword!');
      loginPage.submit();
      
      cy.url().should('include', '/secure');
      loginPage.verifySuccessMessage('You logged into a secure area!');
    });
  });

  describe('Login Form Field Validation', () => {
    it('should have required attribute on username field', () => {
      loginPage.verifyUsernameFieldRequired();
    });

    it('should have required attribute on password field', () => {
      loginPage.verifyPasswordFieldRequired();
    });

    it('should show username and password fields as empty initially', () => {
      loginPage.verifyUsernameFieldEmpty();
      loginPage.verifyPasswordFieldEmpty();
    });

    it('should enable submit button when form is visible', () => {
      loginPage.verifySubmitButtonEnabled();
    });
  });

  describe('Invalid Login Attempts', () => {
    it('should show error message for invalid username', () => {
      loginPage.login('invaliduser', 'SuperSecretPassword!');
      loginPage.verifyErrorMessage('Your username is invalid!');
      cy.url().should('include', '/login');
    });

    it('should show error message for invalid password', () => {
      loginPage.login('tomsmith', 'wrongpassword');
      loginPage.verifyErrorMessage('Your password is invalid!');
      cy.url().should('include', '/login');
    });

    it('should show error message for both invalid credentials', () => {
      loginPage.login('invaliduser', 'wrongpassword');
      loginPage.verifyErrorMessage('Your username is invalid!');
      cy.url().should('include', '/login');
    });
  });

  describe('Empty Field Validation', () => {
    it('should show error when username is empty', () => {
      loginPage.fillPassword('SuperSecretPassword!');
      loginPage.submit();
      
      // HTML5 validation should prevent submission
      cy.get('#username:invalid').should('exist');
    });

    it('should show error when password is empty', () => {
      loginPage.fillUsername('tomsmith');
      loginPage.submit();
      
      // HTML5 validation should prevent submission
      cy.get('#password:invalid').should('exist');
    });

    it('should show error when both fields are empty', () => {
      loginPage.submit();
      
      // HTML5 validation should prevent submission
      cy.get('#username:invalid').should('exist');
      cy.get('#password:invalid').should('exist');
    });
  });

  describe('Form Interaction', () => {
    it('should allow typing in username field', () => {
      loginPage.fillUsername('testuser');
      cy.get('#username').should('have.value', 'testuser');
    });

    it('should allow typing in password field', () => {
      loginPage.fillPassword('testpass');
      cy.get('#password').should('have.value', 'testpass');
    });

    it('should clear fields when typing new values', () => {
      loginPage.fillUsername('olduser');
      loginPage.fillUsername('newuser');
      cy.get('#username').should('have.value', 'newuser');
    });
  });

  describe('Form Visibility and Structure', () => {
    it('should display login form', () => {
      loginPage.verifyFormVisible();
    });

    it('should have username input field', () => {
      cy.get('#username').should('be.visible');
    });

    it('should have password input field', () => {
      cy.get('#password').should('be.visible');
    });

    it('should have submit button', () => {
      cy.get('button[type="submit"]').should('be.visible');
    });
  });
});

