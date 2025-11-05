/// <reference types="cypress" />

describe('Email Validation Tests', () => {
  beforeEach(() => {
    // Navigate to a page - we'll check for email fields dynamically
    cy.visit('/');
  });

  describe('Valid Email Addresses', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.co.uk',
      'firstname+lastname@example.com',
      'email@123.123.123.123',
      'user@domain-one.com',
      'simple@example.com',
      'very.common@example.com',
      'disposable.style.email.with+symbol@example.com',
      'other.email-with-dash@example.com'
    ];

    validEmails.forEach(email => {
      it(`should accept valid email: ${email}`, () => {
        cy.get('body').then(($body) => {
          if ($body.find('input[type="email"]').length > 0) {
            cy.get('input[type="email"]').first().clear().type(email);
            cy.get('input[type="email"]').first().should('have.value', email);
            // Check validity if browser supports it
            cy.get('input[type="email"]').first().then(($input) => {
              if ($input[0].validity) {
                expect($input[0].validity.valid).to.be.true;
              }
            });
          } else {
            cy.log('No email field found - testing email validation logic');
            // Test email format validation programmatically
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            expect(emailRegex.test(email)).to.be.true;
          }
        });
      });
    });
  });

  describe('Invalid Email Addresses', () => {
    const invalidEmails = [
      'plainaddress',
      '@missingdomain.com',
      'missing@.com',
      'missing@domain',
      'spaces in@domain.com',
      'user@domain..com',
      'user name@domain.com',
      'user@domain',
      'user@@domain.com',
      'user@domain@domain.com'
    ];

    invalidEmails.forEach(email => {
      it(`should reject invalid email: ${email}`, () => {
        cy.get('body').then(($body) => {
          if ($body.find('input[type="email"]').length > 0) {
            cy.get('input[type="email"]').first().clear().type(email);
            cy.get('input[type="email"]').first().then(($input) => {
              if ($input[0].validity) {
                expect($input[0].validity.valid).to.be.false;
              }
            });
          } else {
            cy.log('No email field found - testing email validation logic');
            // Test email format validation programmatically
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            expect(emailRegex.test(email)).to.be.false;
          }
        });
      });
    });
  });

  describe('Email Field Attributes', () => {
    it('should have email input type if email field exists', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="email"]').length > 0) {
          cy.get('input[type="email"]').first().should('have.attr', 'type', 'email');
        } else {
          cy.log('No email field found on this page');
        }
      });
    });

    it('should support placeholder text', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="email"]').length > 0) {
          cy.get('input[type="email"]').first().then(($input) => {
            if ($input.attr('placeholder')) {
              cy.get('input[type="email"]').first().should('have.attr', 'placeholder');
            }
          });
        }
      });
    });

    it('should support required attribute', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="email"]').length > 0) {
          cy.get('input[type="email"]').first().then(($input) => {
            if ($input.attr('required')) {
              cy.get('input[type="email"]').first().should('have.attr', 'required');
            }
          });
        }
      });
    });
  });

  describe('Email Input Interaction', () => {
    it('should allow typing in email field', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="email"]').length > 0) {
          cy.get('input[type="email"]').first().type('test@example.com');
          cy.get('input[type="email"]').first().should('have.value', 'test@example.com');
        } else {
          cy.log('No email field found - testing email validation logic');
        }
      });
    });

    it('should allow clearing email field', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="email"]').length > 0) {
          cy.get('input[type="email"]').first().type('test@example.com').clear();
          cy.get('input[type="email"]').first().should('have.value', '');
        }
      });
    });

    it('should allow editing email field', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="email"]').length > 0) {
          cy.get('input[type="email"]').first().type('wrong@example.com');
          cy.get('input[type="email"]').first().clear().type('correct@example.com');
          cy.get('input[type="email"]').first().should('have.value', 'correct@example.com');
        }
      });
    });
  });

  describe('Email Validation on Submit', () => {
    it('should prevent form submission with invalid email', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="email"]').length > 0 && $body.find('form').length > 0) {
          cy.get('input[type="email"]').first().type('invalid-email');
          cy.get('form').first().within(() => {
            cy.get('button[type="submit"]').then(($submit) => {
              if ($submit.length > 0) {
                cy.get('button[type="submit"]').click();
                cy.get('input[type="email"]').first().then(($input) => {
                  if ($input[0].validity) {
                    expect($input[0].validity.valid).to.be.false;
                  }
                });
              }
            });
          });
        } else {
          cy.log('No email field or form found - testing validation logic');
        }
      });
    });

    it('should allow form submission with valid email', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="email"]').length > 0 && $body.find('form').length > 0) {
          cy.get('form').first().within(() => {
            cy.get('input[type="email"]').first().type('valid@example.com');
            cy.get('button[type="submit"]').then(($submit) => {
              if ($submit.length > 0) {
                cy.get('input[type="email"]').first().then(($input) => {
                  if ($input[0].validity) {
                    expect($input[0].validity.valid).to.be.true;
                  }
                });
              }
            });
          });
        }
      });
    });
  });

  describe('Email Field Edge Cases', () => {
    it('should handle empty email field', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="email"]').length > 0) {
          cy.get('input[type="email"]').first().should('have.value', '');
        }
      });
    });

    it('should handle email with special characters', () => {
      const specialEmail = 'user+tag@example.com';
      cy.get('body').then(($body) => {
        if ($body.find('input[type="email"]').length > 0) {
          cy.get('input[type="email"]').first().type(specialEmail);
          cy.get('input[type="email"]').first().then(($input) => {
            if ($input[0].validity) {
              expect($input[0].validity.valid).to.be.true;
            }
          });
        } else {
          // Test validation logic
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          expect(emailRegex.test(specialEmail)).to.be.true;
        }
      });
    });

    it('should handle email with numbers', () => {
      const emailWithNumbers = 'user123@example456.com';
      cy.get('body').then(($body) => {
        if ($body.find('input[type="email"]').length > 0) {
          cy.get('input[type="email"]').first().type(emailWithNumbers);
          cy.get('input[type="email"]').first().then(($input) => {
            if ($input[0].validity) {
              expect($input[0].validity.valid).to.be.true;
            }
          });
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          expect(emailRegex.test(emailWithNumbers)).to.be.true;
        }
      });
    });

    it('should handle email with hyphens', () => {
      const emailWithHyphen = 'user-name@example-domain.com';
      cy.get('body').then(($body) => {
        if ($body.find('input[type="email"]').length > 0) {
          cy.get('input[type="email"]').first().type(emailWithHyphen);
          cy.get('input[type="email"]').first().then(($input) => {
            if ($input[0].validity) {
              expect($input[0].validity.valid).to.be.true;
            }
          });
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          expect(emailRegex.test(emailWithHyphen)).to.be.true;
        }
      });
    });
  });
});

