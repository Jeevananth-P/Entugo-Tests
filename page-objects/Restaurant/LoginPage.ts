import { Page, Locator, expect } from '@playwright/test';
import { testData } from '../../fixtures/testData';
import { WaitUtils } from '../../utils/waitUtils';  

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  private wait: WaitUtils;  

  constructor(page: Page) {
    this.page = page;
    this.wait = new WaitUtils(page); 
    
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('button[type="submit"]').filter({ hasText: 'Sign In' });
  }

  async goto() {
    await this.page.goto(testData.restaurant.baseURL);
  }

  async login() {
    await this.wait.pause();
    await this.emailInput.fill(testData.restaurant.email);
    await this.passwordInput.fill(testData.restaurant.password);
    await this.signInButton.click();
  }

  async expectDashboard() {
    await expect(this.page.locator('button.inline-flex.items-center.justify-center.gap-2:has-text("Dashboard")')).toBeVisible();
  }

  async logout() {
    const logoutButton = this.page.locator(
      'button.inline-flex.items-center:has(svg):has-text("Log Out")'
    );
    
    await logoutButton.click();
  }
  
}
