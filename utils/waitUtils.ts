import { Page, Locator } from '@playwright/test';

export class WaitUtils {
  constructor(private page: Page) {}

  /**
   * Pause for X seconds (hard wait)
   * @param seconds - wait time in seconds (default 5)
   */
  async pause(seconds: number = 5): Promise<void> {
    await this.page.waitForTimeout(seconds * 1000);
  }

  /**
   * Wait for element visible
   */
  async forVisible(locator: Locator, timeoutMs: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: timeoutMs });
  }

  /**
   * Wait for element to exist
   */
  async forExist(locator: Locator, timeoutMs: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'attached', timeout: timeoutMs });
  }

  /**
   * Wait for network to settle
   */
  async forNetworkIdle(timeoutMs: number = 30000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout: timeoutMs });
  }
}
