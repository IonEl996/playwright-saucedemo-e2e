import { shopProductsHelper } from "./helper.ts";
import { type Page } from "@playwright/test";
import { ENV } from "../../../src/utils/env.ts";
import { test } from "../../../src/fixtures/pageObjects.ts";
import { loginWithUser } from "../../../src/utils/auth.ts";
import { navigateToHomepage } from "../../../src/utils/navigation.ts";
import { EXPECTED_ITEMS } from "./data/inventory-items.ts";

test.describe.configure({ mode: "serial" });

test.describe("Shop tests", () => {
  test.beforeEach(async ({ po, page }) => {
    await navigateToHomepage(page);
    await loginWithUser(po, {
      username: ENV.E2E_STANDARD_USER,
      password: ENV.E2E_ALL_USER_PSWD,
    });
  });
  const testCases = [
    { value: "az", type: "az" as const, label: "Name (A to Z)" },
    { value: "za", type: "za" as const, label: "Name (Z to A)" },
    { value: "lohi", type: "lohi" as const, label: "Price (low to high)" },
    { value: "hilo", type: "hilo" as const, label: "Price (high to low)" },
  ];

  test("Verify all shop items are displayed correctly in the shop", async ({
    po,
  }) => {
    const shopPg = shopProductsHelper(po);

    const actualItems = await shopPg.verifyInventoryItems();
    const expectedItems = EXPECTED_ITEMS;
    for (let i = 0; i < expectedItems.length; i++) {
      await shopPg.verifyItemAgainstExpected(actualItems[i], expectedItems[i]);
    }
  });

  test("Verify all inventory sorting options", async ({ po }) => {
    const shopPg = shopProductsHelper(po);

    for (const suite of testCases) {
        await shopPg.selectSortOption(suite.value);
        await shopPg.verifyProductSorting(suite.type);
    }
  });
});
