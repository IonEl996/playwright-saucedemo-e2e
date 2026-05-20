import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  get usernameInputField() {
    return this.page.locator('[data-test="username"]');
  }

  get passwordInputField() {
    return this.page.locator('[data-test="password"]');
  }

  get loginButton() {
    return this.page.locator('[data-test="login-button"]');
  }

  get errorMessageContainer() {
    return this.page.locator('[data-test="error"]');
  }

  get errorCloseButton() {
    return this.page.locator('[data-test="error-button"]');
  }
}
