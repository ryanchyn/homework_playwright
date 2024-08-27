import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/loginPage";
import { InventoryPage } from "../../page-objects/inventoryPage";
import { log } from "console";

test.use({
  ignoreHTTPSErrors: true,
});

//verify if filter is expanded by clicking
test("Filter expanding", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigateTo();
  await loginPage.emailField.pressSequentially("standard_user");
  await loginPage.passwordField.pressSequentially("secret_sauce");
  await loginPage.submitLoginButton.click();

  await inventoryPage.getFiltersDropdown.isVisible();
  await inventoryPage.getFiltersDropdown.click();

  const expectedValues = [
    "Name (A to Z)",
    "Name (Z to A)",
    "Price (low to high)",
    "Price (high to low)",
  ];

  const filterOptionValues = await inventoryPage.getFilterOptionsArr(); // Await the result of the async function

  // Assert that the retrieved values match the expected ones
  expect(filterOptionValues).toEqual(expectedValues);
});

//verify products are sorted by alphabetical
test("Filter alphabet increase", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigateTo();
  await loginPage.emailField.pressSequentially("standard_user");
  await loginPage.passwordField.pressSequentially("secret_sauce");
  await loginPage.submitLoginButton.click();

  // Retrieve product names
  const productNames = await inventoryPage.getProductNames();

  // Sort the product names alphabetically
  const sortedNames = [...productNames].sort();

  // Verify the order is correct
  expect(productNames).toEqual(sortedNames);

  const products = await inventoryPage.getProductNames();
  console.log(products);
});
