import { test, expect } from "@playwright/test";
import { PageManager } from "../../page-objects/PageManager";

test.use({
  ignoreHTTPSErrors: true,
});

test.describe("Social Media Links Tests", () => {
  test("Verify Twitter link", async ({ page, context }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");

    const [newPage] = await Promise.all([
      context.waitForEvent("page"), // Waits for a new tab or window to be opened
      pm.getInventoryPage().twitterLink.click(), // Trigger the click that opens the new tab
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL("https://x.com/saucelabs");
    await newPage.close();
  });

  test("Verify Facebook link", async ({ page, context }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");

    const [newPage] = await Promise.all([
      context.waitForEvent("page"), // Waits for a new tab or window to be opened
      pm.getInventoryPage().facebookLink.click(), // Trigger the click that opens the new tab
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL("https://www.facebook.com/saucelabs");
    await newPage.close();
  });

  test("Verify LinkedIn link", async ({ page, context }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");

    const [newPage] = await Promise.all([
      context.waitForEvent("page"), // Waits for a new tab or window to be opened
      pm.getInventoryPage().linkedinLink.click(), // Trigger the click that opens the new tab
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(
      "https://www.linkedin.com/company/sauce-labs/"
    );
    await newPage.close();
  });
});

test.describe("Inventory Page Tests", () => {
  test("Verify filter dropdown expands on click", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");

    await expect(pm.getInventoryPage().getFiltersDropdown).toBeVisible();
    await pm.getInventoryPage().getFiltersDropdown.click();

    const expectedValues = [
      "Name (A to Z)",
      "Name (Z to A)",
      "Price (low to high)",
      "Price (high to low)",
    ];

    const filterOptionValues = await pm
      .getInventoryPage()
      .getFilterOptionsArr();
    expect(filterOptionValues).toEqual(expectedValues);
  });

  test("Verify products are sorted alphabetically (A to Z)", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");

    const productNames = await pm.getInventoryPage().getProductNames();

    // Sort the product names alphabetically
    const sortedNames = [...productNames].sort();

    expect(productNames).toEqual(sortedNames);
  });
});
