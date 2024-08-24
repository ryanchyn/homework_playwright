import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/loginPage";
import { InventoryPage } from "../../page-objects/inventoryPage";

test.use({
  ignoreHTTPSErrors: true,
});

//positive login case

test("Login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo();
  await loginPage.emailField.pressSequentially("standard_user");
  await loginPage.passwordField.pressSequentially("secret_sauce");
  await loginPage.submitLoginButton.click();

  expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
});

//Positive login by locked out user
test("Login by locked out user", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo();
  await loginPage.emailField.pressSequentially("locked_out_user");
  await loginPage.passwordField.pressSequentially("secret_sauce");
  await loginPage.submitLoginButton.click();
  const errorMessage = await loginPage.incorrectErrorText.textContent();
  expect(errorMessage).toContain(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

//incorrect username and incorrect password - login
test("Login with invalid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo();
  await loginPage.emailField.pressSequentially("incorect_username");
  await loginPage.passwordField.pressSequentially("incorect_password");
  await loginPage.submitLoginButton.click();
  const errorMessage = await loginPage.incorrectErrorText.textContent();
  expect(errorMessage).toContain(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

//correct username and incorrect password - login
test("Login with correct username and incorrect password", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo();
  await loginPage.emailField.pressSequentially("standard_user");
  await loginPage.passwordField.pressSequentially("incorect_password");
  await loginPage.submitLoginButton.click();
  const errorMessage = await loginPage.incorrectErrorText.textContent();
  expect(errorMessage).toContain(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

//incorrect username and correct password - login
test("Login with incorrect username and correct password", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo();
  await loginPage.emailField.pressSequentially("incorrect_user");
  await loginPage.passwordField.pressSequentially("secret_sauce");
  await loginPage.submitLoginButton.click();
  const errorMessage = await loginPage.incorrectErrorText.textContent();
  expect(errorMessage).toContain(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

//log out case
test("Log out", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigateTo();
  await loginPage.emailField.pressSequentially("standard_user");
  await loginPage.passwordField.pressSequentially("secret_sauce");
  await loginPage.submitLoginButton.click();

  expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");

  await inventoryPage.getBurgerButton.click();
  await inventoryPage.getLogoutButton.click();

  expect(page.url()).toBe("https://www.saucedemo.com/");
});

// try to go to inventory page without login by the direct link
test("inventory page without login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo();
  await page.goto("https://www.saucedemo.com/inventory.html");
  const errorMessage = await loginPage.incorrectInventoryLinkText.textContent();
  expect(errorMessage).toBe(
    "Epic sadface: You can only access '/inventory.html' when you are logged in."
  );
});
