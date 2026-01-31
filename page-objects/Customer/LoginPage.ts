// page-objects/customer/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { testData } from '../../fixtures/testData';
import { WaitUtils } from '../../utils/waitUtils'; 

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly welcomeText: Locator;
  readonly errorMessage: Locator;
  private wait: WaitUtils; 

  constructor(page: Page) {
    this.page = page;
    this.wait = new WaitUtils(page); 
    
    this.loginButton = page.locator('button:has-text("Login")');
    this.emailInput = page.locator('input[name="email"]');  // Standard email input
    this.passwordInput = page.locator('input[name="password"]');  // Standard password input
    this.welcomeText = page.locator('h1:has-text("Welcome to Entugo! 🎉")');  // Welcome header
    this.errorMessage = page.locator('div.text-sm.font-semibold:has-text("Login failed")');
  }

  async goto() {
    await this.page.goto(testData.customer.baseURL);  // Customer portal URL
  }

  async signIn(){

  }

  async login() {
    await this.loginButton.click();
    await this.emailInput.fill(testData.customer.email);
    await this.passwordInput.fill(testData.customer.password);
    await this.loginButton.click();
    await this.wait.pause();
    await expect(this.welcomeText).toBeVisible();
  }


  async logout() {
    const logoutButton = this.page.locator('button:has-text("Logout")');
    await logoutButton.click();
  }
}
