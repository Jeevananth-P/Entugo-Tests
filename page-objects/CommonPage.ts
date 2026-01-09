import { Page, Locator, expect } from "@playwright/test";
import { WaitUtils } from "../utils/waitUtils";

export class CommonPage {
  readonly page: Page;
  private wait: WaitUtils;

  // Sidebar navigation (large buttons)
  private sidebarButton(buttonText: string): Locator {
    return this.page.locator(
      `button.inline-flex.items-center.w-full.h-11:has(svg):has-text("${buttonText}")`
    );
  }

  // Logout button (special locator)
  private readonly logoutButton: Locator;

  // Common UI elements (your new HTML)
  readonly settingsAvatar: Locator; // "T" avatar → Settings
  readonly closeSidebarIcon: Locator; // panel-right icon
  readonly toggleSidebarButton: Locator; // menu icon (mobile)
  readonly backButton: Locator; // arrow-left
  readonly themeToggle: Locator; // sun/moon
  readonly creditsButton: Locator; // "Credits: 10"
  readonly languageButton: Locator; // "English (US)"

  constructor(page: Page) {
    this.page = page;
    this.wait = new WaitUtils(page);

    // Logout (special: different classes)
    this.logoutButton = page.locator(
      'button.inline-flex.items-center.w-full.h-11:has(svg.lucide-log-out):has-text("Log Out")'
    );

    // Common elements (your HTML)
    this.settingsAvatar = page.locator(
      "span.relative.flex.shrink-0.rounded-full.w-14.h-14"
    );
    this.closeSidebarIcon = page.locator("svg.lucide-panel-right");
    this.toggleSidebarButton = page.locator(
      "button.hidden.lg\\:flex:has(svg.lucide-menu)"
    ).first();
    this.backButton = page.locator("button:has(svg.lucide-arrow-left)");
    this.themeToggle = page.locator(
      "button.inline-flex.h-9.w-9:has(svg.lucide-sun), button.inline-flex.h-9.w-9:has(svg.lucide-moon)"
    );
    this.creditsButton = page.locator('button:has-text("Credits:")');
    this.languageButton = page.locator('button:has-text("English (US)")');
  }

  // Sidebar navigation (your pattern)
  async goToDashboard() {
    await this.clickSidebar("Dashboard");
    await this.verifyNavigation("Dashboard");
  }

  async goToScanRedeem() {
    await this.clickSidebar("Scan & Redeem");
    await this.verifyNavigation("Scan & Redeem");
  }

  async goToPlansBilling() {
    await this.clickSidebar("Plans & Billing");
    await this.verifyNavigation("Plans & Billing");
  }

  async goToFeedback() {
    await this.clickSidebar("Feedback");
    await this.verifyNavigation("Feedback");
  }

  async goToMyCoupons() {
    await this.clickSidebar("My Coupons");
    await this.verifyNavigation("My Coupons");
  }

  async goToHistory() {
    await this.clickSidebar("History");
    await this.verifyNavigation("History");
  }

  async goToSmartMarketing() {
    await this.clickSidebar("Smart Marketing");
    await this.verifyNavigation("Smart Marketing");
  }

  async goToOrders() {
    await this.clickSidebar("Orders");
    await this.verifyNavigation("Orders");
  }

  async goToMenu() {
    await this.clickSidebar("Menu");
    await this.verifyNavigation("Menu");
  }

  async goToStaffManagement() {
    await this.clickSidebar("Staff Management");
    await this.verifyNavigation("Staff Management");
  }

  async goToQrCodeManagement() {
    await this.clickSidebar("QR Code Management");
    await this.verifyNavigation("QR Code Management");
  }

  private async clickSidebar(buttonText: string) {
    const button = this.sidebarButton(buttonText);
    await button.click();
    await this.wait.pause(1);
  }

  // Logout (separate method)
  async logout() {
    await this.logoutButton.click();
  }

  // Common actions
  async goToSettings() {
    await this.settingsAvatar.click();
    await this.wait.pause(1);
  }

  async closeSidebar() {
    await this.closeSidebarIcon.click();
  }

  async toggleSidebar() {
    await this.toggleSidebarButton.click();
  }

  async goBack() {
    await this.backButton.click();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  async assertCreditsVisible() {
    await expect(this.creditsButton).toBeVisible();
  }

  async changeLanguage() {
    await this.languageButton.click();
  }

  async verifyNavigation(buttonText: string) {
    const btn = this.page.locator(
      `button.inline-flex.items-center.justify-center.gap-2.h-8:has-text("${buttonText}")`
    );
    await expect(btn).toBeVisible();
  }

  async reload() {
    await this.page.reload({ waitUntil: 'domcontentloaded' ,timeout: 10000});
  }

}
