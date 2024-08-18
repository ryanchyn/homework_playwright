import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/loginPage";
import { InventoryPage } from "../../page-objects/inventoryPage";

test.use({
  ignoreHTTPSErrors: true,
});

//positive login case

test("Login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.getEmailField.pressSequentially("sandard_user");
  await loginPage.getPasswordField.pressSequentially("secret_sauce");
  await loginPage.getSubmitLoginButton.click();

  expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
});

//negative login case
test("Login with invalid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.getEmailField.pressSequentially("incorect_username");
  await loginPage.getPasswordField.pressSequentially("incorect_password");
  await loginPage.getSubmitLoginButton.click();
  const errorMessage = await loginPage.getIncorrectErrorText.textContent();
  expect(errorMessage).toContain(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

//log out case
test("Log out", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.getEmailField.pressSequentially("standard_user");
  await loginPage.getPasswordField.pressSequentially("secret_sauce");
  await loginPage.getSubmitLoginButton.click();

  expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");

  await inventoryPage.getBurgerButton.click();
  await inventoryPage.getLogoutButton.click();

  expect(page.url()).toBe("https://www.saucedemo.com/");
});

// try to go to inventory page without login by the direct link
test("inventory page without login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await page.goto("https://www.saucedemo.com/inventory.html");
  const errorMessage =
    await loginPage.getIncorectInventoryLinkText.textContent();
  expect(errorMessage).toBe(
    "Epic sadface: You can only access '/inventory.html' when you are logged in."
  );
});
