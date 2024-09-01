import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/loginPage";
import { InventoryPage } from "../../page-objects/inventoryPage";

test.use({
  ignoreHTTPSErrors: true,
});

// test.beforeAll(async ({ page }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.navigateTo();
//   await loginPage.emailField.pressSequentially("standard_user");
//   await loginPage.passwordField.pressSequentially("secret_sauce");
//   await loginPage.submitLoginButton.click();
// });

//verify if filter is expanded by clicking
test("Details page", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login("standard_user", "secret_sauce");

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.getInventoryItemName.first().click();
  expect(page.url()).toContain("inventory-item");
});

test("Content test", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  //await inventoryPage.getInventoryItemName.first().click();
});

test("Back to product - button", async ({ page }) => {});

test("Add to cart - button", async ({ page }) => {});

test("Delete - button", async ({ page }) => {});
