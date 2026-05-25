import { shopProductsHelper } from "./helper.ts";
import { type Page } from "@playwright/test";
import { ENV } from "../../../src/utils/env.ts";
import { test } from "../../../src/fixtures/pageObjects.ts";
import { loginWithUser } from "../../../src/utils/auth.ts";
import { navigateToHomepage } from "../../../src/utils/navigation.ts";
import { EXPECTED_ITEMS } from "./data/inventory-items.ts";

test.describe.configure({ mode: "serial" });

//let page: Page;

test.describe("Shop tests", () => {
  /* test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });
  test.afterAll(async () => {
    await page.close();
  }); */
  test("Verify shop items", async ({ po, page }) => {
    const shopPg = shopProductsHelper(po);
    await navigateToHomepage(page);
    await loginWithUser(po, {
      username: ENV.E2E_STANDARD_USER,
      password: ENV.E2E_ALL_USER_PSWD,
    });

    const actualItems = await shopPg.verifyInventoryItems();
    const expectedItems = EXPECTED_ITEMS;
    for (let i = 0; i < expectedItems.length; i++) {
      await shopPg.verifyItemAgainstExpected(actualItems[i], expectedItems[i]);
    }
  });
});
