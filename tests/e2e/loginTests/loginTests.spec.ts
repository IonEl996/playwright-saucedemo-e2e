import { loginHelpers } from "./helper.ts";
import { navigateToHomepage } from "../../../src/utils/navigation.ts";
import { ENV } from "../../../src/utils/env.ts";
import { test } from "../../../src/fixtures/pageObjects.ts";

test.describe.configure({ mode: "serial" });

test.describe("Log in functional tests", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToHomepage(page);
  });

  test("Log in with a standard user", async ({ page, po }) => {
    const loginPg = loginHelpers(po, page);

    await loginPg.loginWithUser(
      po,
      ENV.E2E_STANDARD_USER,
      ENV.E2E_ALL_USER_PSWD,
    );
  });
});
