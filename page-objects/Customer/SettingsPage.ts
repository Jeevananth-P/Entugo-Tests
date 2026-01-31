// page-objects/customer/SettingsPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { WaitUtils } from '../../utils/waitUtils';
import { testData } from '../../fixtures/testData';

export class SettingsPage {
  readonly page: Page;
  private wait: WaitUtils;

  // Header
  readonly backButton: Locator;
  readonly profileTitle: Locator;

  // Profile section
  readonly avatar: Locator;
  readonly userName: Locator;
  readonly editButton: Locator;
  readonly email: Locator;

  // Settings list items
  readonly darkModeToggle: Locator;
  readonly darkModeIcon: Locator;
  readonly darkModeText: Locator;
  readonly languageIcon: Locator;
  readonly languageSelect: Locator;
  readonly shareAppButton: Locator;
  readonly policyLink: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wait = new WaitUtils(page);

    // Header
    this.backButton = page.locator('header button:has(svg.lucide-arrow-left)');
    this.profileTitle = page.locator('h1:text("Profile")');

    // Profile card
    this.avatar = page.locator('div.w-16.h-16.rounded-full');
    this.userName = page.locator('h2.text-xl.font-bold:text("Jeeva")');
    this.editButton = page.locator('button:has(svg.lucide-pencil)');
    this.email = page.locator('p.text-sm.text-gray-500:text("jeevananth.p@entugo.com")');

    // Settings toggles & buttons
    this.darkModeToggle = page.locator('[role="switch"]');
    this.darkModeIcon = page.locator('svg.lucide-moon');
    this.darkModeText = page.locator('span:text("Dark Mode")');
    
    this.languageIcon = page.locator('svg.lucide-languages');
    this.languageSelect = page.locator('#google_translate_element');
    
    this.shareAppButton = page.locator('span:text("Share app")');
    this.policyLink = page.locator('svg.lucide-arrow-left.rotate-180');
    this.logoutButton = page.locator('button[aria-haspopup="dialog"]:has(svg.lucide-log-out)');
  }

  async verifyOnSettingsPage() {
    await expect(this.profileTitle).toBeVisible();
    await expect(this.userName).toBeVisible();
    await expect(this.darkModeToggle).toBeVisible();
  }

  async goBack() {
    await this.backButton.click();
  }

  async toggleDarkMode() {
    await this.darkModeToggle.click();
    await expect(this.darkModeToggle).toHaveAttribute('aria-checked', 'true');
  }

  async changeLanguage() {
    await this.page.reload({ waitUntil: "domcontentloaded", timeout: 10000 });
    await this.languageSelect.click();
    const firstOption = this.page.locator('.goog-te-combo option').first();
    await firstOption.click();
  }

  async checkShareApp() {
    await expect(this.shareAppButton).toBeVisible();
  }

  async checkPolicy() {
    await this.policyLink.click();
    await this.page.locator('button:has(svg.lucide-chevron-left)').click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async verifyProfile() {
    await expect(this.avatar).toBeVisible();
    await expect(this.email).toContainText(testData.customer.email);
  }
}

