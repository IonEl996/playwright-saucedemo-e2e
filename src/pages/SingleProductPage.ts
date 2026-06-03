import { Page } from "@playwright/test";

export class SingleProductPage {
  constructor(private page: Page) {}

  get backToProductsBtn() {
    return this.page.locator('[data-test="back-to-products"]');
  }
}
