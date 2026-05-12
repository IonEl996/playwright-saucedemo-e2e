# Playwright SauceDemo E2E Automation Framework

[![CI](https://github.com/IonEl996/playwright-saucedemo-e2e/actions/workflows/playwright.yml/badge.svg)](https://github.com/IonEl996/playwright-saucedemo-e2e/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0+-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.59+-red.svg)](https://playwright.dev/)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)

A scalable and maintainable End-to-End (E2E) automation framework built with Playwright and TypeScript, implementing the Page Object Model (POM) design pattern. This framework is specifically designed for testing the [Sauce Demo](https://www.saucedemo.com/) e-commerce application.

## 🚀 Features

- **Modern Stack**: Built with TypeScript, Playwright, and ES6+ features
- **Page Object Model**: Clean separation of test logic and page interactions
- **Cross-browser Testing**: Chrome, Firefox, WebKit support (currently configured for Chromium)
- **Parallel Execution**: Fast test execution with built-in parallelization
- **Interactive Debugging**: UI mode and debugging capabilities
- **Code Quality**: ESLint, Prettier, and Husky pre-commit hooks
- **HTML Reports**: Rich, interactive test reports with screenshots and videos
- **Source Control Integration**: Automated CI/CD with GitHub Actions
- **Type Safety**: Full TypeScript support with strict type checking

## 📋 Prerequisites

- **Node.js**: 16.x or higher
- **npm**: 8.x or higher
- **Git**: For version control

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IonEl996/playwright-saucedemo-e2e.git
   cd playwright-saucedemo-e2e
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## 🏗️ Project Structure

```
playwright-saucedemo-e2e/
├── src/
│   ├── pages/              # Page Object Model classes
│   ├── fixtures/           # Test fixtures and data
│   └── utils/              # Utility functions and helpers
├── tests/
│   ├── e2e/               # End-to-end test scenarios
│   └── integration/       # Integration tests
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.js       # ESLint configuration
└── package.json           # Project metadata and scripts
```

## 🧪 Running Tests

### **Run All Tests**
```bash
npm test
```

### **Run Tests in UI Mode**
```bash
npm run test:ui
```

### **Run Tests in Debug Mode**
```bash
npm run test:debug
```

### **Run Specific Test File**
```bash
npx playwright test tests/e2e/login.spec.ts
```

### **Run Tests with Different Browsers**
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📊 Test Reports

After test execution, an HTML report is automatically generated:

```bash
npx playwright show-report
```

The report includes:
- Test execution results
- Screenshots of failures
- Video recordings (when enabled)
- Execution timeline
- Trace files for debugging

## 🔧 Configuration

### **Playwright Configuration** (`playwright.config.ts`)

Key features configured:
- Target URL: `https://www.saucedemo.com`
- Parallel execution enabled
- HTML reporting
- Screenshot and trace on first retry
- CI-friendly settings

### **TypeScript Configuration** (`tsconfig.json`)

Strict TypeScript setup with:
- ES2020 target
- Modern module resolution
- Strict type checking
- Playwright type definitions

### **Code Quality**

- **ESLint**: Enforces coding standards and best practices
- **Prettier**: Consistent code formatting
- **Husky**: Git hooks for automated checks
- **lint-staged**: Run linters on staged files before commit

## 📝 Writing Tests

### **Basic Test Example**

```typescript
import { test, expect } from '@playwright/test';

test('should login successfully', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://www.saucedemo.com');
  
  // Verify page title
  await expect(page).toHaveTitle(/Swag Labs/);
  
  // Add your test logic here
});
```

### **Page Object Model Example**

```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  get usernameInput() {
    return this.page.locator('[data-test="username"]');
  }

  get passwordInput() {
    return this.page.locator('[data-test="password"]');
  }

  get loginButton() {
    return this.page.locator('[data-test="login-button"]');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

// tests/login.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('successful login flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await page.goto('https://www.saucedemo.com');
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Add assertions here
});
```

## 🎯 Test Scenarios

The framework is designed to cover key SauceDemo e-commerce flows:

- 📝 **Authentication**: Login, logout, password validation
- 🛍️ **Product Catalog**: Browse products, sort, filter
- 🛒 **Shopping Cart**: Add to cart, remove items, update quantities
- 📍 **Checkout**: Complete purchase flow with user information
- 👤 **User Account**: Profile management, order history

## 🔍 Debugging Tips

1. **Use VS Code Extension**: Install the official Playwright extension for better debugging experience
2. **Trace Viewer**: Use `npx playwright show-trace trace.zip` to analyze test execution
3. **Screenshots**: Screenshots are automatically captured on failure
4. **Live Debugging**: Use `--debug` flag to step through tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run linting: `npm run lint:fix`
5. Run tests: `npm test`
6. Commit your changes: `git commit -m 'Add some amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)
- [Sauce Demo Website](https://www.saucedemo.com/)

## 🐛 Troubleshooting

### **Common Issues**

1. **Browser Not Found**: Run `npx playwright install` to install browsers
2. **Test Timeout**: Increase timeout in `playwright.config.ts`
3. **Element Not Found**: Use Playwright's code generator: `npx playwright codegen https://www.saucedemo.com`
4. **CI Failures**: Check that browsers are installed in CI pipeline

### **Getting Help**

- Check the [Playwright Troubleshooting Guide](https://playwright.dev/docs/troubleshooting)
- Review existing [Issues](https://github.com/IonEl996/playwright-saucedemo-e2e/issues)
- Create a new issue with detailed error logs

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Playwright Team](https://playwright.dev/) for the excellent testing framework
- [Sauce Demo](https://www.saucedemo.com/) for providing a demo e-commerce application
- The open-source community for valuable tools and resources

---

**Happy Testing! 🎭**