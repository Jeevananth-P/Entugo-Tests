// page-objects/customer/CommonPage.ts
import { Page, Locator, expect } from "@playwright/test";
import { WaitUtils } from "../../utils/waitUtils";
import { testData } from "../../fixtures/testData";

export class CommonPage {
  readonly page: Page;
  private wait: WaitUtils;

  // Sidebar navigation (GLOBAL)
  private sidebarLink(linkText: string): Locator {
    return this.page.locator(
      `a.flex.items-center.gap-3.px-4.py-3.rounded-lg:has(svg):has-text("${linkText}")`
    );
  }

  // GLOBAL elements only
  readonly logoutButton: Locator;
  readonly userAvatar: Locator;
  readonly tugoCoinsButton: Locator;
  readonly settingsButton: Locator;
  readonly headerUserName: Locator;
  readonly tutorialNextButton: Locator; // GLOBAL - appears anywhere

  constructor(page: Page) {
    this.page = page;
    this.wait = new WaitUtils(page);

    // GLOBAL elements
    this.logoutButton = page.locator('button:has(svg.lucide-log-out):has-text("Logout")');
    this.userAvatar = page.locator("div.w-10.h-10.rounded-full.bg-app-primary");
    this.tugoCoinsButton = page.locator('a.bg-app-primary.text-white:has-text("🪙")');
    this.settingsButton = page.locator("a:has(svg.lucide-settings)");
    this.headerUserName = page.locator('span.font-medium.text-foreground:has-text("Jeeva")');
    this.tutorialNextButton = page.locator("button.driver-popover-next-btn");
  }

  // GLOBAL navigation
  async goToHome() {
    await this.clickSidebar("Home");
  }

  async goToRestaurants() {
    await this.clickSidebar("Restaurants");
  }

  async goToScanEarn() {
    await this.clickSidebar("Scan & Earn");
  }

  async goToRewards() {
    await this.clickSidebar("Rewards");
  }

  async goToSettings() {
    await this.settingsButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async goToTugoCoins(){
    await this.tugoCoinsButton.click();
  }

  async reload() {
    await this.page.reload({ waitUntil: "domcontentloaded", timeout: 10000 });
  }

  // GLOBAL - appears after login anywhere
  async dismissTutorial() {
    let clicks = 0;
    const maxClicks = 4;

    while (clicks < maxClicks) {
      if (await this.tutorialNextButton.isVisible({ timeout: 1000 })) {
        await this.tutorialNextButton.click();
        clicks++;
        await this.page.waitForTimeout(500);
      } else {
        break;
      }
    }
  }

  async verifyUserLoggedIn(userName = testData.customer.name) {
    await expect(this.headerUserName).toContainText(userName);
  }

  async verifyTugoCoinsVisible() {
    await expect(this.tugoCoinsButton).toBeVisible();
  }

  private async clickSidebar(linkText: string) {
    const link = this.sidebarLink(linkText);
    await link.click();
    await this.wait.pause(1);
  }
}
