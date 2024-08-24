import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly submitLoginButton: Locator;
  readonly incorrectErrorText: Locator;
  readonly incorrectInventoryLinkText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailField = page.locator("#user-name");
    this.passwordField = page.getByPlaceholder("Password");
    this.submitLoginButton = page.getByRole("button", { name: "Login" });
    this.incorrectErrorText = page.locator(".error-message-container.error");
    this.incorrectInventoryLinkText = page.locator(
      "xpath=//div[@id='login_button_container']//form//h3"
    );
  }

  async navigateTo() {
    await this.page.goto("https://www.saucedemo.com/");
  }
}
