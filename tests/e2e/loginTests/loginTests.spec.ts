import { loginHelpers } from "./helper.ts";
import { loginWithUser } from "../../../src/utils/auth.ts";
import { navigateToHomepage } from "../../../src/utils/navigation.ts";
import { ENV } from "../../../src/utils/env.ts";
import { test } from "../../../src/fixtures/pageObjects.ts";

const testdata = {
  cookies: {
    SESSION_COOKIE: "session-username",
    SESSION_COOKIE_VALUE: {
      STANDARD_USER: "standard_user",
      PROBLEM_USER: "problem_user",
      PERFORMANCE_USER: "performance_glitch_user",
      ERROR_USER: "error_user",
      VISUAL_USER: "visual_user",
    },
  },
  messages: {
    LOCKED_OUT_ERROR: "Epic sadface: Sorry, this user has been locked out.",
    INCORRECT_CREDENTIALS:
      "Epic sadface: Username and password do not match any user in this service",
    MISSING_USERNAME: "Epic sadface: Username is required",
    MISSING_PASSWORD: "Epic sadface: Password is required",
  },
};

test.describe.configure({ mode: "serial" });

test.describe("Log in functional tests", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToHomepage(page);
  });

  test("Log in/out with a standard user", async ({ page, po, context }) => {
    const loginPg = loginHelpers(po, page);
    const shopPg = loginHelpers(po, page);

    await loginWithUser(po, {
      username: ENV.E2E_STANDARD_USER,
      password: ENV.E2E_ALL_USER_PSWD,
    });
    await loginPg.assertLoginSuccessful(po, page);
    await loginPg.checkLoginCookie(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
      testdata.cookies.SESSION_COOKIE_VALUE.STANDARD_USER,
    );
    await shopPg.logout(po);
    await loginPg.checkCookieGetsDeletedOnLogout(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
    );
  });

  test("Log in with a problem user", async ({ page, po, context }) => {
    const loginPg = loginHelpers(po, page);
    const shopPg = loginHelpers(po, page);

    await loginWithUser(po, {
      username: ENV.E2E_PROBLEM_USER,
      password: ENV.E2E_ALL_USER_PSWD,
    });
    await loginPg.assertLoginSuccessful(po, page);
    await loginPg.checkLoginCookie(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
      testdata.cookies.SESSION_COOKIE_VALUE.PROBLEM_USER,
    );
    await shopPg.logout(po);
    await loginPg.checkCookieGetsDeletedOnLogout(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
    );
  });

  test("Log in with performance glitch user", async ({ page, po, context }) => {
    const loginPg = loginHelpers(po, page);
    const shopPg = loginHelpers(po, page);

    await loginWithUser(po, {
      username: ENV.E2E_PERFORMANCE_USER,
      password: ENV.E2E_ALL_USER_PSWD,
    });
    await loginPg.checkLoginCookie(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
      testdata.cookies.SESSION_COOKIE_VALUE.PERFORMANCE_USER,
    );
    await shopPg.logout(po);
    await loginPg.checkCookieGetsDeletedOnLogout(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
    );
  });

  test("Log in with error user", async ({ page, po, context }) => {
    const loginPg = loginHelpers(po, page);
    const shopPg = loginHelpers(po, page);

    await loginWithUser(po, {
      username: ENV.E2E_ERROR_USER,
      password: ENV.E2E_ALL_USER_PSWD,
    });
    await loginPg.checkLoginCookie(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
      testdata.cookies.SESSION_COOKIE_VALUE.ERROR_USER,
    );
    await shopPg.logout(po);
    await loginPg.checkCookieGetsDeletedOnLogout(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
    );
  });

  test("Log in with visual user", async ({ page, po, context }) => {
    const loginPg = loginHelpers(po, page);
    const shopPg = loginHelpers(po, page);

    await loginWithUser(po, {
      username: ENV.E2E_VISUAL_USER,
      password: ENV.E2E_ALL_USER_PSWD,
    });
    await loginPg.checkLoginCookie(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
      testdata.cookies.SESSION_COOKIE_VALUE.VISUAL_USER,
    );
    await shopPg.logout(po);
    await loginPg.checkCookieGetsDeletedOnLogout(
      page,
      context,
      testdata.cookies.SESSION_COOKIE,
    );
  });

  test("Log in with missing credentials", async ({ page, po }) => {
    const loginPg = loginHelpers(po, page);

    await loginWithUser(po, {
      username: null,
      password: ENV.E2E_ALL_USER_PSWD,
    });
    await loginPg.checkErrorMessages(page, testdata.messages.MISSING_USERNAME);
    await loginPg.clearField(page, po.loginPg.passwordInputField);
    await loginWithUser(po, {
      username: ENV.E2E_STANDARD_USER,
      password: null,
    });
    await loginPg.checkErrorMessages(page, testdata.messages.MISSING_PASSWORD);
    await loginPg.clearField(page, po.loginPg.usernameInputField);
    await loginWithUser(po, {
      username: null,
      password: null,
    });
    await loginPg.checkErrorMessages(page, testdata.messages.MISSING_USERNAME);
  });

  test("Log in with locked out user", async ({ page, po }) => {
    const loginPg = loginHelpers(po, page);

    await loginWithUser(po, {
      username: ENV.E2E_LOCKED_USER,
      password: ENV.E2E_ALL_USER_PSWD,
    });
    await loginPg.checkErrorMessages(page, testdata.messages.LOCKED_OUT_ERROR);
  });
});
