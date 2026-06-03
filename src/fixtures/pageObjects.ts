import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.ts";
import { ShopPage } from "../pages/ShopPage.ts";
import { ShoppingCartPage } from "../pages/ShoppingCartPage.ts";
import { SingleProductPage } from "../pages/SingleProductPage.ts";

export type PO = {
  loginPg: LoginPage;
  shopPg: ShopPage;
  shopCartPg: ShoppingCartPage;
  singleItmPg: SingleProductPage;
};

// Extend base test with a `po` fixture that wires real Playwright Page per test.
export const test = base.extend<{ po: PO }>({
  po: async ({ page }, use) => {
    const po: PO = {
      loginPg: new LoginPage(page),
      shopPg: new ShopPage(page),
      shopCartPg: new ShoppingCartPage(page),
      singleItmPg: new SingleProductPage(page),
    };
    await use(po);
  },
});
