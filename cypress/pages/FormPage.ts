/// <reference types="cypress" />

export class FormPage {
  // Selectors
  private readonly form = 'form';
  private readonly firstNameInput = '#firstname';
  private readonly lastNameInput = '#lastname';
  private readonly emailInput = '#email';
  private readonly phoneInput = '#phone';
  private readonly messageTextarea = '#message';
  private readonly submitButton = 'button[type="submit"]';
  private readonly successMessage = '.success-message';
  private readonly errorMessage = '.error-message';
  private readonly validationError = '.validation-error';

  /**
   * Navigate to form page
   * @param url - URL path for the form page
   */
  visit(url: string = '/form'): void {
    cy.visit(url);
    cy.get(this.form).should('be.visible');
  }

  /**
   * Fill first name field
   * @param firstName - First name to enter
   */
  fillFirstName(firstName: string): void {
    cy.get(this.firstNameInput).clear().type(firstName);
  }

  /**
   * Fill last name field
   * @param lastName - Last name to enter
   */
  fillLastName(lastName: string): void {
    cy.get(this.lastNameInput).clear().type(lastName);
  }

  /**
   * Fill email field
   * @param email - Email to enter
   */
  fillEmail(email: string): void {
    cy.get(this.emailInput).clear().type(email);
  }

  /**
   * Fill phone field
   * @param phone - Phone number to enter
   */
  fillPhone(phone: string): void {
    cy.get(this.phoneInput).clear().type(phone);
  }

  /**
   * Fill message textarea
   * @param message - Message to enter
   */
  fillMessage(message: string): void {
    cy.get(this.messageTextarea).clear().type(message);
  }

  /**
   * Submit the form
   */
  submit(): void {
    cy.get(this.submitButton).click();
  }

  /**
   * Fill all required fields
   * @param data - Object containing form data
   */
  fillAllFields(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  }): void {
    this.fillFirstName(data.firstName);
    this.fillLastName(data.lastName);
    this.fillEmail(data.email);
    this.fillPhone(data.phone);
    this.fillMessage(data.message);
  }

  /**
   * Verify success message
   * @param message - Expected success message text
   */
  verifySuccessMessage(message: string): void {
    cy.get(this.successMessage)
      .should('be.visible')
      .and('contain.text', message);
  }

  /**
   * Verify error message
   * @param message - Expected error message text
   */
  verifyErrorMessage(message: string): void {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('contain.text', message);
  }

  /**
   * Verify field validation error
   * @param fieldSelector - Selector of the field
   * @param errorText - Expected error text
   */
  verifyFieldValidationError(fieldSelector: string, errorText: string): void {
    cy.get(fieldSelector)
      .parent()
      .find(this.validationError)
      .should('be.visible')
      .and('contain.text', errorText);
  }

  /**
   * Verify field is required
   * @param fieldSelector - Selector of the field
   */
  verifyFieldRequired(fieldSelector: string): void {
    cy.get(fieldSelector).should('have.attr', 'required');
  }

  /**
   * Verify email field format validation
   */
  verifyEmailFormat(): void {
    cy.get(this.emailInput).should('have.attr', 'type', 'email');
  }

  /**
   * Verify field is empty
   * @param fieldSelector - Selector of the field
   */
  verifyFieldEmpty(fieldSelector: string): void {
    cy.get(fieldSelector).should('have.value', '');
  }

  /**
   * Verify submit button is disabled
   */
  verifySubmitButtonDisabled(): void {
    cy.get(this.submitButton).should('be.disabled');
  }

  /**
   * Verify submit button is enabled
   */
  verifySubmitButtonEnabled(): void {
    cy.get(this.submitButton).should('be.enabled');
  }

  /**
   * Clear all form fields
   */
  clearAllFields(): void {
    cy.get(this.firstNameInput).clear();
    cy.get(this.lastNameInput).clear();
    cy.get(this.emailInput).clear();
    cy.get(this.phoneInput).clear();
    cy.get(this.messageTextarea).clear();
  }
}

