import { expect, type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly getLogoText: Locator;
  readonly getFooterText: Locator;
  readonly getFiltersDropdown: Locator;
  readonly getShopingCartButton: Locator;
  readonly getAddToCartButton: Locator;

  readonly getBurgerButton: Locator;
  readonly getAllItemsButton: Locator;
  readonly getAboutButton: Locator;
  readonly getLogoutButton: Locator;
  readonly getResetAppState: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getLogoText = page.locator(
      "xpath=//*[@id='header_container']/div[1]/div[2]/div"
    );
    this.getFooterText = page.locator(
      "xpath=//*[@id='page_wrapper']/footer/div"
    );
    this.getFiltersDropdown = page.locator(
      "xpath=//*[@id='header_container']/div[2]/div/span/select"
    );
    this.getShopingCartButton = page.locator(
      "xpath=//*[@id='shopping_cart_container']/a"
    );
    this.getAddToCartButton = page.locator(
      "xpath=//*[@id='add-to-cart-sauce-labs-backpack']"
    );
    this.getBurgerButton = page.locator(
      "xpath=/html//button[@id='react-burger-menu-btn']"
    );
    this.getAllItemsButton = page.locator(
      "xpath=/html//a[@id='inventory_sidebar_link']"
    );
    this.getAboutButton = page.locator(
      "xpath=/html//a[@id='about_sidebar_link']"
    );
    this.getLogoutButton = page.locator(
      "xpath=/html//a[@id='logout_sidebar_link']"
    );
    this.getResetAppState = page.locator(
      "xpath=/html//a[@id='reset_sidebar_link']"
    );
  }
}
