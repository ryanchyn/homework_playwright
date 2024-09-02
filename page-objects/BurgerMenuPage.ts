import { expect, type Locator, type Page } from "@playwright/test";

export class BurgerMenuPage {
  readonly getBurgerButton: Locator;
  readonly getAllItemsButton: Locator;
  readonly getAboutButton: Locator;
  readonly getLogoutButton: Locator;
  readonly getResetAppState: Locator;

  constructor(page: Page) {
    this.getBurgerButton = page.locator("#react-burger-menu-btn");
    this.getAllItemsButton = page.locator("#inventory_sidebar_link");
    this.getAboutButton = page.locator("#about_sidebar_link");
    this.getLogoutButton = page.locator("#logout_sidebar_link");
    this.getResetAppState = page.locator("#reset_sidebar_link");
  }
}
