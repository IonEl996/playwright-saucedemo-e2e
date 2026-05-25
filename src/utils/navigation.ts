import { Page, expect, chromium, firefox, webkit } from "@playwright/test";
import { ENV } from "../utils/env.ts";

type BrowserType = "chromium" | "firefox" | "webkit";

const browserType = (process.env.BROWSER_TYPE as BrowserType) || "chromium";

export const browser =
  browserType === "firefox"
    ? await firefox.launch()
    : browserType === "webkit"
      ? await webkit.launch()
      : await chromium.launch();
export const context = await browser.newContext();
const page = await context.newPage();

export const navigateToHomepageWithStorage = async (): Promise<void> => {
  await page.goto(ENV.E2E_FRONT_URL);
  await expect(page).toHaveTitle(/Swag Labs/);
};

export const navigateToHomepage = async (page: Page): Promise<void> => {
  await page.goto(ENV.E2E_FRONT_URL);
  await expect(page).toHaveTitle(/Swag Labs/);
};
