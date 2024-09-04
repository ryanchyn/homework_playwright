import { test, expect } from "@playwright/test";
import { PageManager } from "../../page-objects/PageManager";

test.use({
  ignoreHTTPSErrors: true,
});

test.describe("Burger Menu Tests", () => {
  test("All Items button", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");
    await pm.getBurgerMenuPage().getBurgerButton.click();
    await pm.getBurgerMenuPage().getAllItemsButton.click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("About button", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");
    await pm.getBurgerMenuPage().getBurgerButton.click();
    await pm.getBurgerMenuPage().getAboutButton.click();
    await expect(page).toHaveURL("https://saucelabs.com/");
  });

  test("Log out", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");
    await pm.getBurgerMenuPage().getBurgerButton.click();
    await pm.getBurgerMenuPage().getLogoutButton.click();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("Reset App State button", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");
    await pm.getBurgerMenuPage().getBurgerButton.click();
    await pm.getBurgerMenuPage().getResetAppState.click();
    await pm.getBurgerMenuPage().getAllItemsButton.click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
});
