import { expect, type Locator, type Page } from "@playwright/test";

export class ItemPage {
  readonly page: Page;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;
  readonly button_addToCard: Locator;
  readonly button_remove: Locator;
  readonly button_backToProducts: Locator;
  readonly button_shopingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemName = page.locator(".inventory_details_name");
    this.itemDescription = page.locator(".inventory_details_desc");
    this.itemPrice = page.locator(".inventory_details_price");
    this.button_addToCard = page.locator("#add-to-cart");
    this.button_remove = page.locator("#remove");
    this.button_backToProducts = page.locator("#back-to-products");
    this.button_shopingCartLink = page.locator("#shopping_cart_container");
  }
}
