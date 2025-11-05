# Cypress Form Validation E2E

[![Cypress](https://img.shields.io/badge/Cypress-13.6.2-brightgreen)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node-%3E%3D16-success)](https://nodejs.org/)

E2E test suite with Cypress and TypeScript for form validation. Includes authentication tests, input validations (email, password, required fields), error handling, and success scenarios. Implements Page Object Model for organized and reusable code.

## 📖 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [Project Structure](#-project-structure)
- [Test Suites](#-test-suites)
- [Page Object Model](#-page-object-model)
- [Examples](#-examples)
- [Configuration](#️-configuration)
- [Best Practices](#-best-practices)
- [CI/CD Integration](#-cicd-integration)
- [Troubleshooting](#-troubleshooting)
- [Resources](#-resources)

## 🚀 Features

- **Login Flow Testing**: Complete authentication testing with valid and invalid credentials
- **Form Validation**: Comprehensive form validation tests including required fields, email format validation
- **Page Object Model (POM)**: Clean and maintainable code structure
- **TypeScript Support**: Full TypeScript integration for type safety
- **Custom Commands**: Reusable Cypress commands for common operations
- **Multiple Test Suites**: Organized test files for different validation scenarios

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cypress-form-validation-e2e
```

2. Install dependencies:
```bash
npm install
```

## 🧪 Running Tests

### Run all tests headless:
```bash
npm test
```

### Run tests in headed mode:
```bash
npm run test:headed
```

### Run tests in specific browser:
```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
```

### Open Cypress Test Runner (Interactive Mode):
```bash
npm run test:open
```

### Run tests with tags:
```bash
npm run test:smoke      # Run smoke tests
npm run test:regression # Run regression tests
```

### Run specific test file:
```bash
npx cypress run --spec "cypress/e2e/login.cy.ts"
```

### Run tests with specific environment:
```bash
CYPRESS_BASE_URL=https://example.com npm test
```

### Debug mode:
```bash
npx cypress run --headed --no-exit
```

## 📁 Project Structure

```
cypress-form-validation-e2e/
├── cypress/
│   ├── e2e/                    # Test files
│   │   ├── login.cy.ts         # Login form validation tests
│   │   ├── form-validation.cy.ts # General form validation tests
│   │   └── email-validation.cy.ts # Email validation tests
│   ├── fixtures/               # Test data
│   │   └── test-data.json      # Test data fixtures
│   ├── pages/                  # Page Object Models
│   │   ├── LoginPage.ts        # Login page object
│   │   └── FormPage.ts         # Form page object
│   └── support/                # Support files
│       ├── commands.ts         # Custom Cypress commands
│       └── e2e.ts             # Cypress configuration
├── cypress.config.ts           # Cypress configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## 📝 Test Suites

### Login Tests (`login.cy.ts`)
- ✅ Successful login flow
- ✅ Form field validation
- ✅ Invalid login attempts
- ✅ Empty field validation
- ✅ Form interaction tests

### Form Validation Tests (`form-validation.cy.ts`)
- ✅ Required field validation
- ✅ Email format validation
- ✅ Input field validation
- ✅ Form submission tests
- ✅ Form reset functionality

### Email Validation Tests (`email-validation.cy.ts`)
- ✅ Valid email addresses
- ✅ Invalid email addresses
- ✅ Email field attributes
- ✅ Email input interaction
- ✅ Email validation on submit
- ✅ Edge cases

## 🎯 Page Object Model

The project uses Page Object Model pattern for better code organization:

### LoginPage
- `visit()` - Navigate to login page
- `login(username, password)` - Perform login action
- `fillUsername(username)` - Fill username field
- `fillPassword(password)` - Fill password field
- `submit()` - Submit the form
- `verifySuccessMessage(message)` - Verify success message
- `verifyErrorMessage(message)` - Verify error message

### FormPage
- `visit(url)` - Navigate to form page
- `fillAllFields(data)` - Fill all form fields
- `submit()` - Submit the form
- `verifySuccessMessage(message)` - Verify success message
- `verifyFieldRequired(selector)` - Verify field is required

## 🔧 Custom Commands

The project includes custom Cypress commands:

- `cy.login(username, password)` - Login with credentials
- `cy.containsText(selector, text)` - Check if element contains text
- `cy.fillField(selector, value)` - Fill form field with validation

### Example Usage:

```typescript
// Using custom login command
cy.login('tomsmith', 'SuperSecretPassword!');

// Using custom fillField command
cy.fillField('#username', 'testuser');

// Using custom containsText command
cy.containsText('#flash', 'Success');
```

## 💡 Examples

### Basic Login Test Example

```typescript
import { LoginPage } from '../pages/LoginPage';

describe('Login Test', () => {
  let loginPage: LoginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    loginPage.visit();
  });

  it('should login successfully', () => {
    loginPage.login('tomsmith', 'SuperSecretPassword!');
    loginPage.verifyRedirectAfterLogin();
    loginPage.verifySuccessMessage('You logged into a secure area!');
  });
});
```

### Form Validation Example

```typescript
import { FormPage } from '../pages/FormPage';

describe('Form Validation', () => {
  it('should validate required fields', () => {
    const formPage = new FormPage();
    formPage.visit('/login');
    
    formPage.submit();
    
    // HTML5 validation should prevent submission
    cy.get('input[required]:invalid').should('exist');
  });
});
```

### Using Test Data from Fixtures

```typescript
describe('Login with Fixtures', () => {
  beforeEach(() => {
    cy.fixture('test-data').as('testData');
  });

  it('should login with valid credentials from fixtures', function() {
    const { valid } = this.testData.login;
    cy.login(valid.username, valid.password);
    cy.url().should('include', '/secure');
  });
});
```

## 📊 Test Data

Test data is stored in `cypress/fixtures/test-data.json`:
- Login credentials (valid/invalid/empty)
- Email addresses (valid/invalid)
- Form data samples

## ⚙️ Configuration

### Cypress Configuration
- Base URL: `https://the-internet.herokuapp.com`
- Viewport: 1280x720
- Default timeout: 10000ms
- Video recording: Enabled
- Screenshots on failure: Enabled

### Environment Variables

You can configure the tests using environment variables:

```bash
# Set custom base URL
CYPRESS_BASE_URL=https://your-app.com

# Disable video recording
CYPRESS_VIDEO=false

# Set custom timeout
CYPRESS_DEFAULT_COMMAND_TIMEOUT=15000
```

Create a `.env` file in the root directory:

```env
CYPRESS_BASE_URL=https://the-internet.herokuapp.com
CYPRESS_VIDEO=true
CYPRESS_DEFAULT_COMMAND_TIMEOUT=10000
```

### TypeScript Configuration
- Target: ES2020
- Strict mode: Enabled
- Module resolution: Node

### Browser Configuration

The project supports multiple browsers:
- Chrome (Chromium)
- Firefox
- Edge
- Electron (default)

To configure browsers, see `cypress.config.ts`.

## ✨ Best Practices

This project follows Cypress best practices:

### 1. Page Object Model Pattern
- All page interactions are encapsulated in page objects
- Reusable methods for common actions
- Easier maintenance and updates

### 2. Test Organization
- Tests are grouped by functionality
- Descriptive test names
- Clear test structure

### 3. Custom Commands
- Reusable commands for common operations
- Type-safe with TypeScript
- Easy to extend

### 4. Data Management
- Test data in fixtures
- Separation of test logic and data
- Easy to update test data

### 5. Error Handling
- Comprehensive error messages
- Proper assertions
- Clear failure messages

### 6. Wait Strategies
- Using Cypress's built-in waiting mechanisms
- Avoiding hard-coded waits
- Reliable test execution

## 🔄 CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/cypress.yml`:

```yaml
name: Cypress Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - uses: cypress-io/github-action@v6
        with:
          install: false
          start: npm start
          wait-on: 'http://localhost:3000'
```

### GitLab CI Example

Create `.gitlab-ci.yml`:

```yaml
cypress:
  image: cypress/browsers:latest
  script:
    - npm ci
    - npm run test
  artifacts:
    when: always
    paths:
      - cypress/screenshots
      - cypress/videos
```

## 📊 Test Results

### View Test Results

After running tests, results are available in:
- **Console output**: Immediate feedback
- **Cypress Dashboard**: (if configured) Detailed reports
- **Videos**: `cypress/videos/` - Full test execution videos
- **Screenshots**: `cypress/screenshots/` - Failure screenshots

### Test Coverage

The project includes:
- ✅ **15+ Login tests** - Complete authentication flow
- ✅ **10+ Form validation tests** - Required fields and validations
- ✅ **20+ Email validation tests** - Comprehensive email format testing

### Performance Metrics

- Average test execution time: ~2-3 minutes (all tests)
- Individual test time: ~5-15 seconds per test
- Browser startup time: ~3-5 seconds

## 🐛 Troubleshooting

### Common Issues

1. **Tests failing due to timeouts**
   - Increase timeout values in `cypress.config.ts`
   - Check network connectivity

2. **TypeScript errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check `tsconfig.json` configuration

3. **Browser not launching**
   - Ensure browser is installed
   - Check Cypress browser configuration
   - Try: `npx cypress verify`

4. **Tests running slowly**
   - Reduce video quality in `cypress.config.ts`
   - Disable videos for successful tests
   - Use `cypress run` instead of `cypress open` for CI

5. **Element not found errors**
   - Check if element selectors are correct
   - Verify page has loaded before interacting
   - Use Cypress's built-in retry-ability

6. **TypeScript compilation errors**
   - Ensure all dependencies are installed: `npm install`
   - Check `tsconfig.json` paths configuration
   - Restart TypeScript server in IDE

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Resources

### Documentation
- [Cypress Documentation](https://docs.cypress.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://docs.cypress.io/guides/references/best-practices#Organizing-Tests-Login-Custom-Commands-and-Seeding-State)

### Learning Resources
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Real World App](https://github.com/cypress-io/cypress-realworld-app)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### Community
- [Cypress Discord](https://discord.gg/cypress)
- [Cypress GitHub Discussions](https://github.com/cypress-io/cypress/discussions)
- [Stack Overflow - Cypress](https://stackoverflow.com/questions/tagged/cypress)

## 📈 Roadmap

Future improvements planned:
- [ ] Add visual regression testing
- [ ] Implement API testing integration
- [ ] Add test coverage reporting
- [ ] Create more test scenarios
- [ ] Add performance testing
- [ ] Implement parallel test execution
- [ ] Add accessibility testing

## 🎓 Learning Objectives

This project demonstrates:
- ✅ E2E testing with Cypress
- ✅ TypeScript integration for type safety
- ✅ Page Object Model implementation
- ✅ Form validation testing patterns
- ✅ Custom Cypress commands
- ✅ Test data management with fixtures
- ✅ Best practices for test organization

## 📄 License

MIT

## 👤 Author

Created as part of the **365 Days QA Challenge - Day 4**

---

## ⚠️ Important Notes

- This project uses `the-internet.herokuapp.com` as the test application for form validation testing
- All tests are designed to work with publicly available test pages
- Credentials used are test accounts provided by The Internet Heroku App
- Make sure you have a stable internet connection when running tests

## 🎯 Test Application

**Base URL**: `https://the-internet.herokuapp.com`

**Test Credentials**:
- Username: `tomsmith`
- Password: `SuperSecretPassword!`

**Available Test Pages**:
- `/login` - Form authentication
- `/secure` - Secure area (after login)
- Various other pages for different testing scenarios

---

**⭐ If you find this project helpful, please give it a star!**
