import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly closeErrorMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator("#user-name");
    this.passwordField = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator(".error-message-container h3");
    this.closeErrorMessageButton = page.locator(".error-button");
  }

  async open() {
    await this.page.goto("/");
  }

  async signIn(username: string, password: string) {
    await this.usernameField.type(username);
    await this.passwordField.type(password);
    await this.loginButton.click();
  }

  async assertErrorMessage() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  }
  async closeErrorMessageClick() {
    await this.closeErrorMessageButton.click();
  }

  async assertCloseErrorMessage() {
    await expect(await this.errorMessage).not.toBeVisible();
  }
}
