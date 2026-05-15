import { loginHelpers } from "./helper.ts";
import { navigateToHomepage } from "../../../src/utils/navigation.ts";
import { ENV } from "../../../src/utils/env.ts";
import { test } from "../../../src/fixtures/pageObjects.ts";

const testdata = {
  cookies: {
    SESSION_COOKIE: "session-username",
    SESSION_COOKIE_VALUE: {
      STANDARD_USER: "standard_user",
      PROBLEM_USER: "problem_user",
    },
  },
};

test.describe.configure({ mode: "serial" });

test.describe("Log in functional tests", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToHomepage(page);
  });

  test("Log in/out with a standard user", async ({ page, po, context }) => {
    const loginPg = loginHelpers(po, page);
    const dashPg = loginHelpers(po, page);

    await loginPg.loginWithUser(
      po,
      ENV.E2E_STANDARD_USER,
      ENV.E2E_ALL_USER_PSWD,
    );
    await loginPg.assertLoginSuccessful(page);
    await loginPg.checkLoginCookie(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
      testdata.cookies.SESSION_COOKIE_VALUE.STANDARD_USER,
    );
    await dashPg.logout(po);
    await loginPg.checkCookieGetsDeletedOnLogout(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
    );
  });
  test("Log in with a problem user", async ({ page, po, context }) => {
    const loginPg = loginHelpers(po, page);
    const dashPg = loginHelpers(po, page);

    await loginPg.loginWithUser(
      po,
      ENV.E2E_PROBLEM_USER,
      ENV.E2E_ALL_USER_PSWD,
    );
    await loginPg.assertLoginSuccessful(page);
    await loginPg.checkLoginCookie(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
      testdata.cookies.SESSION_COOKIE_VALUE.PROBLEM_USER,
    );
    await dashPg.logout(po);
    await loginPg.checkCookieGetsDeletedOnLogout(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
    );
  });
});
