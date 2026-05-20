import { Page } from "@playwright/test";

export class DashboardPage {
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
}
