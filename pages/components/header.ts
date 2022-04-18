import { expect, Locator, Page } from "@playwright/test";

export class Header {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly menuButton: Locator;
  readonly counterProductsInCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator(".shopping_cart_container");
    this.menuButton = page.locator(".bm-burger-button");
    this.counterProductsInCart = page.locator(".shopping_cart_badge");
  }

  async cartLinkClick() {
    await this.cartLink.click();
  }

  async assertCartCounter() {
    await expect(this.counterProductsInCart).toBeVisible();
  }

  async assertCartCounterNotExist() {
    await expect(this.counterProductsInCart).not.toBeVisible();
  }
}
