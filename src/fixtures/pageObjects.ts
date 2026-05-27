import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.ts";
import { ShopPage } from "../pages/ShopPage.ts";

export type PO = {
  loginPg: LoginPage;
  shopPg: ShopPage;
};

// Extend base test with a `po` fixture that wires real Playwright Page per test.
export const test = base.extend<{ po: PO }>({
  po: async ({ page }, use) => {
    const po: PO = {
      loginPg: new LoginPage(page),
      shopPg: new ShopPage(page),
    };
    await use(po);
  },
});
