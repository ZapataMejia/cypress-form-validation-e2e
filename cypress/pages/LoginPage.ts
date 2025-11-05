/// <reference types="cypress" />

export class LoginPage {
  // Selectors
  private readonly usernameInput = '#username';
  private readonly passwordInput = '#password';
  private readonly submitButton = 'button[type="submit"]';
  private readonly successMessage = '#flash';
  private readonly errorMessage = '#flash.flash.error';
  private readonly loginForm = '#login';

  /**
   * Navigate to login page
   */
  visit(): void {
    cy.visit('/login');
    cy.get(this.loginForm).should('be.visible');
  }

  /**
   * Fill username field
   * @param username - Username to enter
   */
  fillUsername(username: string): void {
    cy.get(this.usernameInput).clear().type(username);
  }

  /**
   * Fill password field
   * @param password - Password to enter
   */
  fillPassword(password: string): void {
    cy.get(this.passwordInput).clear().type(password);
  }

  /**
   * Click submit button
   */
  submit(): void {
    cy.get(this.submitButton).click();
  }

  /**
   * Perform complete login action
   * @param username - Username to login with
   * @param password - Password to login with
   */
  login(username: string, password: string): void {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  /**
   * Check if success message is displayed
   * @param message - Expected success message text
   */
  verifySuccessMessage(message: string): void {
    cy.get(this.successMessage)
      .should('be.visible')
      .and('contain.text', message);
  }

  /**
   * Check if error message is displayed
   * @param message - Expected error message text
   */
  verifyErrorMessage(message: string): void {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('contain.text', message);
  }

  /**
   * Check if username field is empty
   */
  verifyUsernameFieldEmpty(): void {
    cy.get(this.usernameInput).should('have.value', '');
  }

  /**
   * Check if password field is empty
   */
  verifyPasswordFieldEmpty(): void {
    cy.get(this.passwordInput).should('have.value', '');
  }

  /**
   * Check if submit button is disabled
   */
  verifySubmitButtonDisabled(): void {
    cy.get(this.submitButton).should('be.disabled');
  }

  /**
   * Check if submit button is enabled
   */
  verifySubmitButtonEnabled(): void {
    cy.get(this.submitButton).should('be.enabled');
  }

  /**
   * Verify username field validation
   */
  verifyUsernameFieldRequired(): void {
    cy.get(this.usernameInput).should('have.attr', 'required');
  }

  /**
   * Verify password field validation
   */
  verifyPasswordFieldRequired(): void {
    cy.get(this.passwordInput).should('have.attr', 'required');
  }

  /**
   * Check if form is visible
   */
  verifyFormVisible(): void {
    cy.get(this.loginForm).should('be.visible');
  }

  /**
   * Check if user is redirected after successful login
   */
  verifyRedirectAfterLogin(): void {
    cy.url().should('include', '/secure');
  }
}

