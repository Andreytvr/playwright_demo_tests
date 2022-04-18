import { expect, Locator, Page } from "@playwright/test";

export default class CheckoutPage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;
  readonly orderInfo: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backToHomeButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(".title");
    this.firstName = page.locator("#first-name");
    this.lastName = page.locator("#last-name");
    this.postalCode = page.locator("#postal-code");
    this.cancelButton = page.locator("#cancel");
    this.continueButton = page.locator("#continue");
    this.orderInfo = page.locator(".summary_info");
    this.completeHeader = page.locator(".complete-header");
    this.completeText = page.locator(".complete-text");
    this.backToHomeButton = page.locator("#back-to-products");
    this.finishButton = page.locator("#finish");
  }

  async assertCheckoutInformationPage() {
    await expect(this.title).toHaveText("Checkout: Your Information");
    await expect(this.firstName).toBeEmpty();
    await expect(this.lastName).toBeEmpty();
    await expect(this.postalCode).toBeEmpty();
    await expect(this.cancelButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async addUserInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstName.type(firstName);
    await this.lastName.type(lastName);
    await this.postalCode.type(postalCode);
  }

  async assertCheckoutOverview() {
    await expect(this.title).toHaveText("Checkout: Overview");
    await expect(this.orderInfo).toContainText("Payment Information:");
    await expect(this.orderInfo).toContainText("SauceCard #");
    await expect(this.orderInfo).toContainText("Shipping Information:");
    await expect(this.orderInfo).toContainText("FREE PONY EXPRESS DELIVERY!");
    await expect(this.orderInfo).toContainText("Item total:");
    await expect(this.orderInfo).toContainText("Tax:");
    await expect(this.orderInfo).toContainText("Total:");
    await expect(this.cancelButton).toBeVisible();
    await expect(this.finishButton).toBeVisible();
  }

  async assertCheckoutComplete() {
    await expect(this.completeHeader).toHaveText("THANK YOU FOR YOUR ORDER");
    await expect(this.completeText).toHaveText(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
    await expect(this.backToHomeButton).toBeVisible();
  }

  async continueButtonClick() {
    await this.continueButton.click();
  }

  async finishButtonClick() {
    await this.finishButton.click();
  }
}
