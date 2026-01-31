// page-objects/customer/HomePage.ts
import { Page, Locator, expect } from '@playwright/test';
import { WaitUtils } from '../../utils/waitUtils';
import { testData } from '../../fixtures/testData';

export class HomePage {
  readonly page: Page;
  private wait: WaitUtils;

  // QR Card
  readonly qrCard: Locator;
  readonly qrCodeSvg: Locator;
  readonly tugoCardText: Locator;
  readonly discountCodeFront: Locator;
  readonly downloadQrButton: Locator;
  readonly downloadMessage: Locator;

  // Discount Code Section
  readonly discountCodeSection: Locator;
  readonly discountCodeValue: Locator;
  readonly copyDiscountButton: Locator;

  // Quick Action Buttons (MOVED HERE)
  readonly qrQuickButton: Locator;
  readonly tugoCoinQuickButton: Locator;
  readonly couponQuickButton: Locator;
  readonly activityQuickButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wait = new WaitUtils(page);

    // QR Card (main feature)
    this.qrCard = page.locator('div.perspective');
    this.qrCodeSvg = page.locator('#qr-code');
    this.tugoCardText = page.locator('text="TUGO CARD"');
    this.discountCodeFront = page.locator('div.font-bold.tracking-wider');
    this.downloadQrButton = page.locator('button:has-text("Download QR Code")');
    this.downloadMessage = page.locator('div.text-sm.font-semibold:has-text("Copied!")');

    // Discount Code Section
    this.discountCodeSection = page.locator('h3:has-text("Your Active Discount Code:")');
    this.discountCodeValue = page.locator('p.text-lg.font-bold.break-all');
    this.copyDiscountButton = page.locator('button[title="Copy discount code"]');

    // Quick Actions (Home page specific)
    this.qrQuickButton = page.locator('#qr-code-button');
    this.tugoCoinQuickButton = page.locator('#tugo-coin-button');
    this.couponQuickButton = page.locator('#coupon-button');
    this.activityQuickButton = page.locator('#activity-button');
  }

  async verifyOnHomePage() {
    await expect(this.qrCard).toBeVisible();
    await expect(this.discountCodeSection).toBeVisible();
  }

  async downloadQRCode() {
    await this.downloadQrButton.click();
  }

  async copyDiscountCode() {
    await this.copyDiscountButton.click();
    await expect(this.downloadMessage).toBeVisible({ timeout: 5000 });
  }

  // Quick actions (Home page specific)
  async clickQrQuickAction() {
    await this.qrQuickButton.click();
  }

  async clickTugoCoinQuickAction() {
    await this.tugoCoinQuickButton.click();
  }

  async clickCouponQuickAction() {
    await this.couponQuickButton.click();
  }

  async clickActivityQuickAction() {
    await this.activityQuickButton.click();
  }

  async verifyDiscountCodeVisible(code = testData.customer.code) {
    await expect(this.discountCodeValue).toContainText(code);
  }
}
