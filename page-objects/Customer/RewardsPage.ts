// page-objects/customer/RewardsPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { WaitUtils } from '../../utils/waitUtils';

export class RewardsPage {
  readonly page: Page;
  private wait: WaitUtils;

  // Header elements (coins DYNAMIC)
  readonly rewardsHeaderCoins: Locator;
  readonly rewardsHeaderSettings: Locator;

  // Tab section
  readonly rewardsTab: Locator;
  readonly loyaltyTab: Locator;
  readonly tabContainer: Locator;

  // Filter section
  readonly filterButton: Locator;
  readonly locationButton: Locator;
  readonly sortButton: Locator;
  readonly rewardButton: Locator;
  readonly filterContainer: Locator;

  // No results section
  readonly noRewardsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wait = new WaitUtils(page);

    // Header - DYNAMIC coins (just check presence + coin emoji)
    this.rewardsHeaderCoins = page.locator('a.bg-app-primary.text-white:has-text("🪙")');
    this.rewardsHeaderSettings = page.locator('a[href*="/settings/"] svg.lucide-settings');

    // Tabs
    this.rewardsTab = page.locator('#rewards-tab');
    this.loyaltyTab = page.locator('#loyalty-tab');
    this.tabContainer = page.locator('.flex.bg-muted.rounded-md.p-1');

    // Filters
    this.filterButton = page.locator('button:has(svg.lucide-filter)');
    this.locationButton = page.locator('button:has-text("Location")');
    this.sortButton = page.locator('button:has-text("Sort by")');
    this.rewardButton = page.locator('button:has(svg.lucide-chevron-down):has-text("Reward")');
    this.filterContainer = page.locator('.flex.items-center.gap-2.overflow-x-auto');

    // No results
    this.noRewardsMessage = page.locator('p.text-muted-foreground:has-text("No rewards")');
  }

  async verifyOnRewardsPage() {
    await expect(this.tabContainer).toBeVisible();
    await expect(this.rewardsTab).toBeVisible();
    await expect(this.filterContainer).toBeVisible();
  }

  async switchToLoyaltyTab() {
    await this.loyaltyTab.click();
  }

  // Auto-select first dropdown option
  private async selectFirstFilterOption(dropdownButton: Locator) {
    await dropdownButton.click();
    
    // Multiple selectors for dropdown options
    const firstOption = this.page.locator('[role="menuitem"], li[role="menuitem"], .dropdown-menu li, [role="option"]:first-child');
    await firstOption.first().waitFor({ state: 'visible', timeout: 3000 });
    await firstOption.first().click();
    await this.wait.pause(0.5);
  }

  async clickFilterOptionsWithAutoSelect() {
    await this.selectFirstFilterOption(this.filterButton);
    await this.selectFirstFilterOption(this.locationButton);
    await this.selectFirstFilterOption(this.sortButton);
    await this.selectFirstFilterOption(this.rewardButton);
  }

  // ✅ FIXED: Dynamic coins - just verify presence + emoji
  async verifyRewardsHeader() {
    await expect(this.rewardsHeaderCoins).toBeVisible();
    await expect(this.rewardsHeaderCoins).toHaveText(/🪙/); // Contains coin emoji
  }

  async verifyNoRewardsFound() {
    await this.rewardsTab.click();
    await expect(this.noRewardsMessage).toBeVisible();
  }
}
