import { Page } from "@playwright/test";
import { PO } from "../../../src/fixtures/pageObjects.ts";

export function loginHelpers(po: PO, page: Page) {
  const loginWithUser = async (
    po: PO,
    username: string,
    password: string,
  ): Promise<void> => {
    await po.loginPg.usernameInputField.click();
    await po.loginPg.usernameInputField.fill(username);
    await po.loginPg.passwordInputField.click();
    await po.loginPg.passwordInputField.fill(password);
    await po.loginPg.loginButton.click();
  };

  return {
    loginWithUser,
  };
}
