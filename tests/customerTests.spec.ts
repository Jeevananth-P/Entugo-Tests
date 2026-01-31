import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/Customer/LoginPage";
import { CommonPage } from "../page-objects/Customer/CommonPage";
import { HomePage } from "../page-objects/Customer/HomePage";
import { ScanEarnPage } from "../page-objects/Customer/Scan&EarnPage";
import { RewardsPage } from "../page-objects/Customer/RewardsPage";
import { SettingsPage } from "../page-objects/Customer/SettingsPage";
import { RestaurantsPage } from "../page-objects/Customer/RestaurantsPage";

test.describe("Customer Login @smoke", () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test("Valid Customer Login → Dashboard", async ({ page }) => {
    await login.login();
  });

  test("Invalid Credentials - Error Handling", async ({ page }) => {
    await login.loginButton.click();
    await login.emailInput.fill("invalid@test.com");
    await login.passwordInput.fill("wrongpass");
    await login.loginButton.click();
    await expect(login.errorMessage).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Customer Features @smoke", () => {
  let common: CommonPage;
  let login: LoginPage;
  let home: HomePage;
  let scanEarn: ScanEarnPage;
  let rewards: RewardsPage;
  let settings: SettingsPage;
  let restaurants: RestaurantsPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    common = new CommonPage(page);
    home = new HomePage(page);
    scanEarn = new ScanEarnPage(page);
    rewards = new RewardsPage(page);
    settings = new SettingsPage(page);
    restaurants = new RestaurantsPage(page);

    await login.goto();
    await login.login();
    await common.dismissTutorial();
    await common.verifyUserLoggedIn();
  });

  test("✅ Sidebar + Header Navigation", async ({ page }) => {
    await test.step("All sidebar navigation", async () => {
      await common.goToHome();
      await home.verifyOnHomePage();
      await common.goToRestaurants(); // Placeholder
      await common.goToScanEarn();
      await scanEarn.verifyOnScanEarnPage();
      await common.goToRewards();
      await rewards.verifyOnRewardsPage(); // NEW
    });

    await test.step("Header navigation", async () => {
      await common.goToTugoCoins();
      await common.goToSettings();
    });

    await test.step("Logout", async () => {
      await common.logout();
    });
  });

  test("✅ Home Page - All Quick Actions + Features @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Home", async () => {
      await common.goToHome();
      await home.verifyOnHomePage();
    });

    await test.step("QR Card - Verify + Download", async () => {
      await expect(home.qrCodeSvg).toBeVisible();
      await expect(home.discountCodeFront).toContainText("OV47LO2X");
      await home.downloadQRCode();
    });

    await test.step("Discount Code - Verify + Copy", async () => {
      await home.verifyDiscountCodeVisible("OV47LO2X");
      await home.copyDiscountCode();
    });

    await test.step("All 4 Quick Actions", async () => {
      await home.clickQrQuickAction();
      await common.goToHome();
      await home.clickTugoCoinQuickAction();
      await common.goToHome();
      await home.clickCouponQuickAction();
      await common.goToHome();
      await home.clickActivityQuickAction();
    });
  });

  test("✅ Scan & Earn - Scanner Verification @smoke", async ({ page }) => {
    await test.step("Navigate to Scan & Earn", async () => {
      await common.goToScanEarn();
      await scanEarn.verifyOnScanEarnPage();
    });

    await test.step("Scanner ready + Elements", async () => {
      await scanEarn.waitForScannerReady();
      await expect(scanEarn.scannerVideo).toHaveAttribute("autoplay", "");
      await expect(scanEarn.scanSquare).toBeVisible();
      await expect(scanEarn.scanCorners).toHaveCount(4);
    });
  });

  test("✅ Rewards Page - Tabs + Filters @smoke", async ({ page }) => {
    await test.step("Navigate to Rewards", async () => {
      await common.goToRewards();
      await rewards.verifyOnRewardsPage();
    });

    await test.step("Header + Tabs", async () => {
      await rewards.verifyRewardsHeader();
      await expect(rewards.rewardsTab).toHaveClass(/bg-primary/);
      await rewards.switchToLoyaltyTab();
    });

    await test.step("All Filter buttons", async () => {
      await rewards.clickFilterOptionsWithAutoSelect();
      await rewards.verifyNoRewardsFound();
    });
  });

  test("✅ Settings Page - Profile + Toggles @smoke", async ({ page }) => {
    await test.step("Navigate to Settings", async () => {
      await common.goToSettings();
      await settings.verifyOnSettingsPage();
    });

    await test.step("Profile verification", async () => {
      await settings.verifyProfile();
    });

    await test.step("Dark mode toggle", async () => {
      await settings.toggleDarkMode();
    });

    await test.step("All settings actions", async () => {
      await settings.checkShareApp();
      await settings.checkPolicy();
    });

    await test.step("Logout from Settings", async () => {
      await settings.logout();
    });
  });

  test("✅ Restaurants - Full Flow @smoke", async ({ page }) => {
    await test.step("Navigate + Show All", async () => {
      await common.goToRestaurants();
      await restaurants.verifyOnRestaurantsPage();
      await restaurants.clickShowAllIfAvailable();
    });

    await test.step("✅ Click FIRST restaurant + Verify features", async () => {
      await restaurants.verifyRestaurantListFeatures();
      await restaurants.clickFirstRestaurant();
      await restaurants.verifyRestaurantDetailPage();
    });

    await test.step("✅ Test ALL tabs", async () => {
      await restaurants.clickOffersTab();
      await restaurants.verifyNoOffers();

      await restaurants.clickMenuTab();
      await restaurants.clickInfoTab();
    });

    await test.step("Back to list", async () => {
      await page.locator("svg.lucide-arrow-left").locator("..").click();
    });
  });
});
