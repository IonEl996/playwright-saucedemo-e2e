import { expect, Page } from "@playwright/test";
import { PO } from "../../../src/fixtures/pageObjects.ts";
import { ENV } from "../../../src/utils/env.ts";
import { Context } from "node:vm";

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

  const logout = async (po: PO): Promise<void> => {
    await po.dashPg.burgerMenuButton.click();
    await po.dashPg.logoutSidebarButton.click();
    await expect(page).toHaveURL(ENV.E2E_FRONT_URL);
  };

  const assertLoginSuccessful = async (page: Page): Promise<void> => {
    await expect(page).toHaveURL(ENV.E2E_FRONT_URL + "/inventory.html");
  };

  const checkLoginCookie = async (
    page: Page,
    context: Context,
    cookieName: string,
    cookieValue: string,
  ): Promise<void> => {
    const cookiesAfterLogin = await context.cookies();
    const sessionCookie = cookiesAfterLogin.find(
      (c: { name: string; value: string }) => c.name === cookieName,
    );
    expect(sessionCookie).toBeDefined();
    expect(sessionCookie?.value).toBe(cookieValue);
  };

  const checkCookieGetsDeletedOnLogout = async (
    page: Page,
    context: Context,
    cookieName: string,
  ): Promise<void> => {
    const cookiesAfterLogin = await context.cookies();
    const sessionCookie = cookiesAfterLogin.find(
      (c: { name: string; value: string }) => c.name === cookieName,
    );
    expect(sessionCookie).toBeUndefined();
  };

  return {
    loginWithUser,
    assertLoginSuccessful,
    logout,
    checkLoginCookie,
    checkCookieGetsDeletedOnLogout,
  };
}
