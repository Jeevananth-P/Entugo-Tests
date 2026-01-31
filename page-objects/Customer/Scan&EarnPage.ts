// page-objects/customer/ScanEarnPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { WaitUtils } from '../../utils/waitUtils';

export class ScanEarnPage {
  readonly page: Page;
  private wait: WaitUtils;

  // Scan & Earn specific elements
  readonly scanFrame: Locator;
  readonly scannerVideo: Locator;
  readonly scanOverlay: Locator;
  readonly scanSquare: Locator;
  readonly scanCorners: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wait = new WaitUtils(page);

    // Scan & Earn page elements
    this.scanFrame = page.locator('div.w-full.h-full.absolute.inset-0');
    this.scannerVideo = page.locator('video[autoplay][playsinline]');
    this.scanOverlay = page.locator('div.absolute.inset-0.flex.items-center.justify-center.z-10');
    this.scanSquare = page.locator('div.relative.w-64.h-64 > div.w-full.h-full.border-4.border-app-green');
    this.scanCorners = page.locator('div.absolute.-top-4.-left-4, div.absolute.-top-4.-right-4, div.absolute.-bottom-4.-left-4, div.absolute.-bottom-4.-right-4');
  }

  async verifyOnScanEarnPage() {
    await expect(this.scannerVideo).toBeVisible();
    await expect(this.scanSquare).toBeVisible();
    await expect(this.scanCorners).toHaveCount(4);
  }

  async waitForScannerReady() {
    await expect(this.scannerVideo).toBeVisible({ timeout: 5000 });
    await this.wait.pause(2); // Video loads
  }
}
