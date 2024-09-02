import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/loginPage";
import { InventoryPage } from "../../page-objects/inventoryPage";

test.use({
  ignoreHTTPSErrors: true,
});

test.describe("Social Media links Tests", () => {
  test("Verify twitter link", async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login("standard_user", "secret_sauce");

    const [newPage] = await Promise.all([
      context.waitForEvent("page"), // Waits for a new tab or window to be opened
      inventoryPage.twitterLink.click(), // Trigger the click that opens the new tab
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL("https://x.com/saucelabs");
    await newPage.close();
  });

  test("Verify facebook link", async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login("standard_user", "secret_sauce");

    const [newPage] = await Promise.all([
      context.waitForEvent("page"), // Waits for a new tab or window to be opened
      inventoryPage.facebookLink.click(), // Trigger the click that opens the new tab
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL("https://www.facebook.com/saucelabs");
    await newPage.close();
  });

  test("Verify linkedin link", async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login("standard_user", "secret_sauce");

    const [newPage] = await Promise.all([
      context.waitForEvent("page"), // Waits for a new tab or window to be opened
      inventoryPage.linkedinLink.click(), // Trigger the click that opens the new tab
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(
      "https://www.linkedin.com/company/sauce-labs/"
    );
    await newPage.close();
  });
});

test("Verify filter dropdown expands on click", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.login("standard_user", "secret_sauce");

  await expect(inventoryPage.getFiltersDropdown).toBeVisible();
  await inventoryPage.getFiltersDropdown.click();

  const expectedValues = [
    "Name (A to Z)",
    "Name (Z to A)",
    "Price (low to high)",
    "Price (high to low)",
  ];

  const filterOptionValues = await inventoryPage.getFilterOptionsArr();

  expect(filterOptionValues).toEqual(expectedValues);
});

test("Verify products are sorted alphabetically (A to Z)", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.login("standard_user", "secret_sauce");

  const productNames = await inventoryPage.getProductNames();

  // Sort the product names alphabetically
  const sortedNames = [...productNames].sort();

  expect(productNames).toEqual(sortedNames);
});
