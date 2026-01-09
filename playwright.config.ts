import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load .env automatically
dotenv.config();

export default defineConfig({
  // Test files location
  testDir: './tests',
  
  // Global timeout (60s for Entugo flows)
  timeout: 60_000,
  expect: { timeout: 10_000 },
  
  // Global browser settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter (HTML + console)
  reporter: [['html'], ['list']],
  
  // Chrome only (as requested)
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        // Chrome-specific tweaks
        channel: 'chrome',
        headless: true,  // set to false for debugging
        viewport: { width: 1280, height: 720 },
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        // Loads from .env
        baseURL: process.env.CLIENT_URL,
      },
    },
  ],
  
});
