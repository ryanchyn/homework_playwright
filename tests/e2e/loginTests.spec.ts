import { test, expect } from "@playwright/test";
import { PageManager } from "../../page-objects/PageManager";

test.use({ ignoreHTTPSErrors: true });

test.describe("Login Tests", () => {
  test("Should login with valid credentials", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Should not login with locked out user", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("locked_out_user", "secret_sauce");
    await pm
      .getLoginPage()
      .assertLoginErrorMessage(
        "Epic sadface: Sorry, this user has been locked out."
      );
  });

  test("Should show error for incorrect username and password", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("wrong_user", "wrong_password");
    await pm
      .getLoginPage()
      .assertLoginErrorMessage(
        "Epic sadface: Username and password do not match any user in this service"
      );
  });
});

test.describe("Inventory Page Tests", () => {
  test("Should show error when accessing inventory page without login", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    await page.goto("https://www.saucedemo.com/inventory.html");

    await expect(pm.getLoginPage().incorrectInventoryLinkText).toHaveText(
      "Epic sadface: You can only access '/inventory.html' when you are logged in."
    );
  });
});
