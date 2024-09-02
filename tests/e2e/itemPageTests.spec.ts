import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/loginPage";
import { InventoryPage } from "../../page-objects/inventoryPage";
import { ItemPage } from "../../page-objects/ItemPage";

test.use({
  ignoreHTTPSErrors: true,
});

test("Details page", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login("standard_user", "secret_sauce");

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.getInventoryItemName.first().click();
  expect(page.url()).toContain("inventory-item");
});

test("Content test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const itemPage = new ItemPage(page);

  await loginPage.login("standard_user", "secret_sauce");

  await inventoryPage.getInventoryItemName.first().click();

  const itemName = await itemPage.itemName.textContent();
  const buttonText = await itemPage.button_addToCard.textContent();
  const itemPrice = await itemPage.itemPrice.textContent();

  expect(itemName).toContain("Sauce Labs Backpack");
  expect(buttonText).toContain("Add to cart");
  expect(itemPrice).toContain("$29.99");
});

test("Back to product - button", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const itemPage = new ItemPage(page);

  await loginPage.login("standard_user", "secret_sauce");
  await inventoryPage.getInventoryItemName.first().click();
  await itemPage.button_backToProducts.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test("Add to cart - button", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const itemPage = new ItemPage(page);

  await loginPage.login("standard_user", "secret_sauce");
  await inventoryPage.getInventoryItemName.first().click();
  await itemPage.button_addToCard.click();
  const buttonText = await itemPage.button_remove.textContent();
  const cartIconCount = await itemPage.button_shopingCartLink.textContent();

  expect(buttonText).toContain("Remove");
  expect(cartIconCount).toContain("1");
});

test("Remove - button", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const itemPage = new ItemPage(page);

  await loginPage.login("standard_user", "secret_sauce");
  await inventoryPage.getInventoryItemName.first().click();
  await itemPage.button_addToCard.click();
  await itemPage.button_remove.click();

  const buttonText = await itemPage.button_addToCard.textContent();
  const cartIconCount = await itemPage.button_shopingCartLink.textContent();

  expect(buttonText).toContain("Add to cart");
  expect(cartIconCount).toContain("");
});
