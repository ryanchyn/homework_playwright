import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/loginPage";
import { BurgerMenuPage } from "../../page-objects/BurgerMenuPage";

test.use({
  ignoreHTTPSErrors: true,
});

test("All Items button", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const burgerMenuPage = new BurgerMenuPage(page);

  await loginPage.login("standard_user", "secret_sauce");
  await burgerMenuPage.getBurgerButton.click();
  await burgerMenuPage.getAllItemsButton.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test("About button", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const burgerMenuPage = new BurgerMenuPage(page);

  await loginPage.login("standard_user", "secret_sauce");
  await burgerMenuPage.getBurgerButton.click();
  await burgerMenuPage.getAboutButton.click();
  await expect(page).toHaveURL("https://saucelabs.com/");
});

test("Log out", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const burgerMenuPage = new BurgerMenuPage(page);

  await loginPage.login("standard_user", "secret_sauce");
  await burgerMenuPage.getBurgerButton.click();
  await burgerMenuPage.getLogoutButton.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/");
});

test("Reset App State button", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const burgerMenuPage = new BurgerMenuPage(page);

  await loginPage.login("standard_user", "secret_sauce");
  await burgerMenuPage.getBurgerButton.click();
  await burgerMenuPage.getAllItemsButton.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});
