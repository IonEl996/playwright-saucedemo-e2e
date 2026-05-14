import { Page, expect } from "@playwright/test";
import { ENV } from "../utils/env.ts";

export const navigateToHomepage = async (page: Page): Promise<void> => {
  await page.goto(ENV.E2E_FRONT_URL);
  await expect(page).toHaveTitle(/Swag Labs/);
};
