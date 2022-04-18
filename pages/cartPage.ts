import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartTitle: Locator;
  readonly cartItem: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTitle = page.locator(".title");
    this.cartItem = page.locator(".cart_item");
    this.continueShoppingButton = page.locator("#continue-shopping");
    this.checkoutButton = page.locator("#checkout");
  }

  async assertCart() {
    await expect(this.cartTitle).toHaveText("Your Cart");
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }

  async continueShoppingClick() {
    await this.continueShoppingButton.click();
  }

  async checkoutButtonClick() {
    await this.checkoutButton.click();
  }
}
