import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/loginPage";
import { InventoryPage } from "../../page-objects/inventoryPage";
import { BurgerMenuPage } from "../../page-objects/BurgerMenuPage";

test.use({ ignoreHTTPSErrors: true });

test.describe("Login Tests", () => {
  test("Login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Login with locked out user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("locked_out_user", "secret_sauce");
    await loginPage.assertLoginErrorMessage(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  test("Login with incorrect username and password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("wrong_user", "wrong_password");
    await loginPage.assertLoginErrorMessage(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});

test.describe("Inventory Page Tests", () => {
  test("Access inventory page without login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("https://www.saucedemo.com/inventory.html");

    const errorMessage =
      (await loginPage.incorrectInventoryLinkText.textContent()) || "";
    expect(errorMessage).toBe(
      "Epic sadface: You can only access '/inventory.html' when you are logged in."
    );
  });

  // additional tests...
});
