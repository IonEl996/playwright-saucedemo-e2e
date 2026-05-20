import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.ts";
import { DashboardPage } from "../pages/DashboardPage.ts";

export type PO = {
  loginPg: LoginPage;
  dashPg: DashboardPage;
};

// Extend base test with a `po` fixture that wires real Playwright Page per test.
export const test = base.extend<{ po: PO }>({
  po: async ({ page }, use) => {
    const po: PO = {
      loginPg: new LoginPage(page),
      dashPg: new DashboardPage(page),
    };
    await use(po);
  },
});
