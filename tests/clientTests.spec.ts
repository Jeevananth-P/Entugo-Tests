import { test, expect } from '@playwright/test';
import { CommonPage } from '../page-objects/CommonPage'; 
import { LoginPage } from '../page-objects/LoginPage';     

test.describe('CommonPage @smoke', () => {
  let common: CommonPage;
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    common = new CommonPage(page);
    
    await login.goto();
    await login.login(); // Your login flow
    await common.assertCreditsVisible(); // Verify logged in
  });

  test('✅ ALL NAVIGATION + UI methods work', async ({ page }) => {
    // === 12 Sidebar navigations ===
    await test.step('All sidebar navigation', async () => {
      await common.goToDashboard();
      await common.goToScanRedeem();
      await common.goToPlansBilling();
      await common.goToFeedback();
      await common.goToMyCoupons();
      await common.goToHistory();
      await common.goToSmartMarketing();
      await common.goToOrders();
      await common.goToMenu();
      await common.goToStaffManagement();
      await common.goToQrCodeManagement();
    });

    // === 8 Common UI actions ===
    await test.step('All common UI actions', async () => {
      await common.goToSettings();
      await common.closeSidebar();
      await common.toggleSidebar();
      await common.goBack();
      await common.toggleTheme();
      await common.changeLanguage();
      await common.assertCreditsVisible();
    });

    // === Logout ===
    await test.step('Logout', async () => {
      await common.reload();
      await common.logout();
    });
  });
});
