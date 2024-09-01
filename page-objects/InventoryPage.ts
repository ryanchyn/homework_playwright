import { expect, type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly getLogoText: Locator;
  readonly getFooterText: Locator;
  readonly getFiltersDropdown: Locator;
  readonly getShopingCartButton: Locator;
  readonly getAddToCartButtons: Locator;

  readonly getBurgerButton: Locator;
  readonly getAllItemsButton: Locator;
  readonly getAboutButton: Locator;
  readonly getLogoutButton: Locator;
  readonly getResetAppState: Locator;
  readonly getProducts: Locator;
  readonly getInventoryItemName: Locator;

  readonly getFilterOptions: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getLogoText = page.locator(".app_logo");
    this.getFooterText = page.locator(".footer_copy");
    this.getFiltersDropdown = page.locator(".product_sort_container");
    this.getShopingCartButton = page.locator(".shopping_cart_link");
    this.getAddToCartButtons = page.locator(
      ".btn.btn_primary.btn_small.btn_inventory"
    );
    this.getBurgerButton = page.locator("#react-burger-menu-btn");
    this.getAllItemsButton = page.locator("#inventory_sidebar_link");
    this.getAboutButton = page.locator("#about_sidebar_link");
    this.getLogoutButton = page.locator("#logout_sidebar_link");
    this.getResetAppState = page.locator("#reset_sidebar_link");
    this.getFilterOptions = page.locator(".product_sort_container option");
    this.getProducts = page.locator(".inventory_item_description");
    this.getInventoryItemName = page.locator(".inventory_item_name");
  }

  async getFilterOptionsArr(): Promise<string[]> {
    const filterOptionsAll = this.getFilterOptions.allTextContents();
    return filterOptionsAll;
  }

  // Method to retrieve all product names

  // Method to retrieve all product names
  async getProductNames(): Promise<string[]> {
    const names = await this.getProducts.allTextContents();
    return names.map((name) => name.trim());
  }
}
