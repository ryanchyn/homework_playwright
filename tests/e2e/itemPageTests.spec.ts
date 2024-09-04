import { test, expect } from "@playwright/test";
import { PageManager } from "../../page-objects/PageManager";

test.use({ ignoreHTTPSErrors: true });

test.describe("Inventory Item Tests", () => {
  test("Should navigate to item details page", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");

    await pm.getInventoryPage().getInventoryItemName.first().click();
    expect(page.url()).toContain("inventory-item");
  });

  test("Should verify content on item details page", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");

    await pm.getInventoryPage().getInventoryItemName.first().click();

    const itemName = await pm.getItemPage().itemName.textContent();
    const buttonText = await pm.getItemPage().button_addToCard.textContent();
    const itemPrice = await pm.getItemPage().itemPrice.textContent();

    expect(itemName).toContain("Sauce Labs Backpack");
    expect(buttonText).toContain("Add to cart");
    expect(itemPrice).toContain("$29.99");
  });

  test("Should navigate back to product list from item details page", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");

    await pm.getInventoryPage().getInventoryItemName.first().click();
    await pm.getItemPage().button_backToProducts.click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Should add item to cart and verify cart count", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");

    await pm.getInventoryPage().getInventoryItemName.first().click();
    await pm.getItemPage().button_addToCard.click();

    const buttonText = await pm.getItemPage().button_remove.textContent();
    const cartIconCount = await pm
      .getItemPage()
      .button_shopingCartLink.textContent();

    expect(buttonText).toContain("Remove");
    expect(cartIconCount).toContain("1");
  });

  test("Should remove item from cart and verify cart count", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    await pm.getLoginPage().login("standard_user", "secret_sauce");

    await pm.getInventoryPage().getInventoryItemName.first().click();
    await pm.getItemPage().button_addToCard.click();
    await pm.getItemPage().button_remove.click();

    const buttonText = await pm.getItemPage().button_addToCard.textContent();
    const cartIconCount = await pm
      .getItemPage()
      .button_shopingCartLink.textContent();

    expect(buttonText).toContain("Add to cart");
    expect(cartIconCount).toContain("");
  });
});
