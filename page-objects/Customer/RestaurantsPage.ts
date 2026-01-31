// page-objects/customer/RestaurantsPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { WaitUtils } from '../../utils/waitUtils';

export class RestaurantsPage {
  readonly page: Page;
  private wait: WaitUtils;

  // === LOCATION CARD ===
  readonly locationCard: Locator;
  readonly mapPinIcon: Locator;
  readonly pincodeText: Locator;
  readonly showAllButton: Locator;
  readonly nearMeButton: Locator;
  readonly restaurantCountText: Locator;

  // === RESTAURANT LIST ===
  readonly restaurantList: Locator;
  readonly firstRestaurant: Locator;
  readonly restaurantStatusDot: Locator;
  readonly restaurantNameList: Locator;
  readonly restaurantImageList: Locator;
  readonly onlineIndicator: Locator;
  readonly restaurantType: Locator;

  // === RESTAURANT DETAIL PAGE ===
  readonly backButton: Locator;
  readonly restaurantHeroImage: Locator;
  readonly restaurantNameHero: Locator;
  readonly restaurantAddressHero: Locator;
  readonly restaurantRatingBadge: Locator;
  readonly ratingScore: Locator;
  readonly offersTab: Locator;
  readonly menuTab: Locator;
  readonly infoTab: Locator;
  readonly noOffersMessage: Locator;
  readonly tabContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wait = new WaitUtils(page);

    // Location card (Pincode section)
    this.locationCard = page.locator('div.mb-3.sm\\:mb-4.p-2.sm\\:p-3.bg-accent');
    this.mapPinIcon = page.locator('svg.lucide-map-pin.text-primary');
    this.pincodeText = page.locator('text=Pincode');
    this.showAllButton = page.locator('div.bg-accent button:has-text("Show All")');
    this.nearMeButton = page.locator('div.bg-accent button:has-text("Near Me")');
    this.restaurantCountText = page.locator('p.text-\\ [10px\\].sm\\:text-xs.text-muted-foreground');

    // Restaurant list view
    this.restaurantList = page.locator('div.p-2.space-y-3');
    this.firstRestaurant = page.locator('div.flex.justify-between.gap-4.cursor-pointer').first();
    this.restaurantStatusDot = page.locator('div.w-4.h-4.border.rounded.border-2').first();
    this.onlineIndicator = page.locator('div.w-2.h-2.bg-green-500.rounded-full').first();
    this.restaurantNameList = page.locator('h1.text-xl.font-semibold.text-foreground').first();
    this.restaurantImageList = page.locator('div.min-w-36.max-w-36 img').first();
    this.restaurantType = page.locator('p.text-xs.text-muted-foreground').first();

    // Restaurant detail page
    this.backButton = page.locator('svg.lucide-arrow-left').locator('..');
    this.restaurantHeroImage = page.locator('div.w-full.h-48.bg-muted img');
    this.restaurantNameHero = page.locator('h1.text-3xl.font-semibold');
    this.restaurantAddressHero = page.locator('div.absolute.top-3.left-3 p');
    this.restaurantRatingBadge = page.locator('div.bg-orange-500.text-white');
    this.ratingScore = page.locator('div.bg-orange-500 span.text-sm.font-semibold');
    this.tabContainer = page.locator('div.flex.bg-muted.rounded-md');
    this.offersTab = page.locator('button:has-text("Offers")');
    this.menuTab = page.locator('button:has-text("Menu")');
    this.infoTab = page.locator('button:has-text("Info")');
    this.noOffersMessage = page.locator('p:has-text("No offers available")');
  }

  /** Verify on restaurants list page */
  async verifyOnRestaurantsPage() {
    await expect(this.locationCard).toBeVisible();
    await expect(this.restaurantList).toBeVisible();
    console.log('✅ Verified: Restaurants page loaded');
  }

  /** Safe click Show All (handles no restaurants case) */
  async clickShowAllIfAvailable() {
    const isVisible = await this.showAllButton.isVisible({ timeout: 2000 });
    if (isVisible) {
      console.log('✅ "Show All" visible → Clicking');
      await this.showAllButton.scrollIntoViewIfNeeded();
      await this.showAllButton.click({ force: true });
      await this.wait.pause(1);
    } else {
      console.log('ℹ️ No "Show All" button → Skipping');
    }
  }

  /** Click Near Me button */
  async clickNearMe() {
    await this.nearMeButton.click({ force: true });
    await this.wait.pause(1);
  }

  /** Verify restaurant list features */
  async verifyRestaurantListFeatures() {
    await expect(this.restaurantStatusDot).toBeVisible();
    await expect(this.onlineIndicator).toBeVisible();
    await expect(this.restaurantNameList).toBeVisible();
    await expect(this.restaurantImageList).toBeVisible();
    console.log('✅ Verified: Restaurant list features');
  }

  /** Always click FIRST restaurant */
  async clickFirstRestaurant() {
    await this.clickShowAllIfAvailable();
    
    // Wait for restaurants to load
    await this.restaurantList.waitFor({ state: 'visible', timeout: 5000 });
    await this.verifyRestaurantListFeatures();
    
    // Get restaurant name for logging
    const restaurantName = await this.restaurantNameList.textContent() || 'Unknown';
    console.log(`✅ Clicking first restaurant: "${restaurantName}"`);
    
    await this.firstRestaurant.scrollIntoViewIfNeeded();
    await this.firstRestaurant.click({ force: true });
    await this.wait.pause(2); // Hero image loads
  }

  /** Verify restaurant detail page loaded */
  async verifyRestaurantDetailPage() {
    await expect(this.restaurantHeroImage).toBeVisible();
    await expect(this.restaurantNameHero).toBeVisible();
    await expect(this.restaurantRatingBadge).toBeVisible();
    await expect(this.tabContainer).toBeVisible();
    console.log('✅ Verified: Restaurant detail page loaded');
  }

  /** Click Offers tab */
  async clickOffersTab() {
    await this.offersTab.first().click({ force: true });
    await this.wait.pause(1);
    console.log('✅ Clicked Offers tab');
  }

  /** Verify no offers message */
  async verifyNoOffers() {
    await expect(this.noOffersMessage).toBeVisible({ timeout: 3000 });
    console.log('✅ Verified: No offers message');
  }

  /** Click Menu tab */
  async clickMenuTab() {
    await this.menuTab.click({ force: true });
    await this.wait.pause(1);
    console.log('✅ Clicked Menu tab');
  }

  /** Click Info tab */
  async clickInfoTab() {
    await this.infoTab.click({ force: true });
    await this.wait.pause(1);
    console.log('✅ Clicked Info tab');
  }

  /** Go back to restaurant list */
  async goBackToList() {
    await this.backButton.click({ force: true });
    await this.wait.pause(1);
    console.log('✅ Back to restaurant list');
  }

  /** Get restaurant count text */
  async getRestaurantCount() {
    return await this.restaurantCountText.textContent();
  }

  /** Verify specific restaurant details */
  async verifyRestaurantDetails(expectedName: string) {
    const actualName = await this.restaurantNameHero.textContent();
    expect(actualName).toContain(expectedName);
    console.log(`✅ Verified restaurant: "${actualName}"`);
  }
}
