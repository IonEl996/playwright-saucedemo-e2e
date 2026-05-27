import { Page } from "@playwright/test";

export class ShopPage {
  constructor(private page: Page) {}

  // Side Menu
  get burgerMenuButton() {
    return this.page.locator("#react-burger-menu-btn");
  }
  get allItemsSidebarButton() {
    return this.page.locator('[data-test="inventory-sidebar-link"]');
  }
  get aboutSidebarButton() {
    return this.page.locator('[data-test="about-sidebar-link"]');
  }
  get logoutSidebarButton() {
    return this.page.locator('[data-test="logout-sidebar-link"]');
  }
  get resetSidebarButton() {
    return this.page.locator('[data-test="reset-sidebar-link"]');
  }

  // Products
  get inventoryItem() {
    return this.page.locator('[data-test="inventory-item"]');
  }
  get itemImage() {
    return this.page.locator(".inventory_item_img img");
  }
  get itemName() {
    return this.page.locator('[data-test="inventory-item-name"]');
  }
  get itemDescription() {
    return this.page.locator('[data-test="inventory-item-desc"]');
  }
  get itemPrice() {
    return this.page.locator('[data-test="inventory-item-price"]');
  }
  // Add to cart buttons
  get add2CartBackPack() {
    return this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  }
  get add2CartBikeLight() {
    return this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  }
  get add2CartBoltTShirt() {
    return this.page.locator(
      '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
    );
  }
  get add2CartFleece() {
    return this.page.locator(
      '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
    );
  }
  get add2CartOnesie() {
    return this.page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
  }
  get add2AllThingsTShirt() {
    return this.page.locator(
      '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
    );
  }
  // Sorting menu
  get sortDropDown() {
    return this.page.locator('[data-test="product-sort-container"]');
  }
}
