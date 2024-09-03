import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { InventoryPage } from "../page-objects/inventoryPage";
import { ItemPage } from "../page-objects/ItemPage";
import { BurgerMenuPage } from "../page-objects/BurgerMenuPage";

export class PageManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly inventoryPage: InventoryPage;
  private readonly itemPage: ItemPage;
  private readonly burgerMenuPage: BurgerMenuPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.itemPage = new ItemPage(this.page);
    this.burgerMenuPage = new BurgerMenuPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getInventoryPage() {
    return this.inventoryPage;
  }

  getItemPage() {
    return this.itemPage;
  }

  getBurgerMenuPage() {
    return this.burgerMenuPage;
  }
}
