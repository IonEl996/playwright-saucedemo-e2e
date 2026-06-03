import { shopProductsHelper } from "../verifyShopProducts/helper.ts";
import { ENV } from "../../../src/utils/env.ts";
import { test } from "../../../src/fixtures/pageObjects.ts";
import { loginWithUser } from "../../../src/utils/auth.ts";
import {
  navigateToHomepage,
  navigateToCart,
} from "../../../src/utils/navigation.ts";

test.describe.configure({ mode: "serial" });

test.describe("Add to cart tests", () => {
  test.beforeEach(async ({ po, page }) => {
    await navigateToHomepage(page);
    await loginWithUser(po, {
      username: ENV.E2E_STANDARD_USER,
      password: ENV.E2E_ALL_USER_PSWD,
    });
  });
  test("Shop: Add a product to shopping cart", async ({ po }) => {
    // Adding a product to cart from the main shop page.
    const shopPg = shopProductsHelper(po);
    const backpack = shopPg.getExpectedItemById("sauce-labs-backpack");
    await shopPg.addProductToCart(backpack.name);
    await shopPg.verifyProductButtonState(backpack.name, "added");
    await shopPg.verifyShoppingCartBadge(1);
  });
  test("Shop: Remove a product from shopping cart", async ({ po }) => {
    // Removing a product from cart from the main shop page.
    const shopPg = shopProductsHelper(po);
    const onesie = shopPg.getExpectedItemById("sauce-labs-onesie");
    await shopPg.addProductToCart(onesie.name);
    await shopPg.verifyShoppingCartBadge(1);
    await shopPg.removeProductFromCart(onesie.name);
    await shopPg.verifyProductButtonState(onesie.name, "removed");
    await shopPg.verifyShoppingCartBadge(0);
  });
  test("Cart: Remove a product from shopping cart", async ({ po }) => {
    const shopPg = shopProductsHelper(po);
    const tShirt = shopPg.getExpectedItemById("sauce-labs-bolt-t-shirt");
    await shopPg.addProductToCart(tShirt.name);
    await navigateToCart(po);
    await shopPg.verifyProductButtonState(tShirt.name, "added");
    await shopPg.removeProductFromCart(tShirt.name);
    await shopPg.verifyShoppingCartBadge(0);
  });
  test("Product: Add a product to shopping cart", async ({ po }) => {
    // Adding a product to cart from the product page.
    const shopPg = shopProductsHelper(po);
    const onesie = shopPg.getExpectedItemById("sauce-labs-onesie");
    await shopPg.openProductPage(onesie.name);
    await shopPg.addProductToCart(onesie.name);
    await shopPg.verifyProductButtonState(onesie.name, "added");
  });
  test("Product: Remove a product from shopping cart", async ({ po }) => {
    // Removing a product from cart from the product page.
    const shopPg = shopProductsHelper(po);
    const bikeLight = shopPg.getExpectedItemById("sauce-labs-bike-light");
    await shopPg.openProductPage(bikeLight.name);
    await shopPg.addProductToCart(bikeLight.name);
    await shopPg.verifyProductButtonState(bikeLight.name, "added");
    await shopPg.removeProductFromCart(bikeLight.name);
    await shopPg.verifyShoppingCartBadge(0);
  });
});
