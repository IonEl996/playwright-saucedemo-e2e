import { expect, Locator, Page } from "@playwright/test";
import { PO } from "../../../src/fixtures/pageObjects.ts";
import { ENV } from "../../../src/utils/env.ts";
import { Context } from "node:vm";

export function loginHelpers(po: PO, page: Page) {
  const logout = async (po: PO): Promise<void> => {
    await po.shopPg.burgerMenuButton.click();
    await po.shopPg.logoutSidebarButton.click();
    await expect(page).toHaveURL(ENV.E2E_FRONT_URL);
  };

  const assertLoginSuccessful = async (po: PO, page: Page): Promise<void> => {
    await page.waitForURL("**/inventory.html", { timeout: 10000 });
    await expect(page).toHaveURL(ENV.E2E_FRONT_URL + "/inventory.html");
    await expect(po.shopPg.inventoryItem).toHaveCount(6);

    const invItems = await po.shopPg.inventoryItem.all();
    for (const item of invItems) {
      await expect(item).toBeVisible();
    }

    console.log("✅ Login successful, saving session state...");
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

  const checkErrorMessages = async (
    page: Page,
    errorMessage: string,
  ): Promise<void> => {
    const errorMsg = po.loginPg.errorMessageContainer;
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText(errorMessage, { ignoreCase: true });
  };

  const clearField = async (page: Page, locator: Locator): Promise<void> => {
    await locator.click();
    await locator.press("ControlOrMeta+A");
    await locator.clear();
  };

  return {
    assertLoginSuccessful,
    logout,
    checkLoginCookie,
    checkCookieGetsDeletedOnLogout,
    checkErrorMessages,
    clearField,
  };
}
