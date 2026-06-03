import { Page } from "@playwright/test";

export class ShoppingCartPage {
  constructor(private page: Page) {}

  get cartTitle() {
    return this.page.locator('[data-test="title"]');
  }
  get checkoutButton() {
    return this.page.locator('[data-test="checkout"]');
  }
  get continueShoppingButton() {
    return this.page.locator('[data-test="continue-shopping"]');
  }
  get itemQty() {
    return this.page.locator('[data-test="item-quantity"]');
  }
}
