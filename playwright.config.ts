import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

// Load .env automatically
dotenv.config();

export default defineConfig({
  use: {
    // ✅ AUTO-GRANT these permission for ALL tests
    permissions: [
      'geolocation', 
      'camera', 
      'microphone', 
      'notifications',
      'clipboard-read',    
      'clipboard-write'    
    ],

    // ✅ Mock Chennai location (your location)
    geolocation: {
      latitude: 13.0827,
      longitude: 80.2707,
    },

    // ✅ Your timezone
    timezoneId: "Asia/Kolkata",
  },

  // Test files location
  testDir: "./tests",

  // Global timeout (60s for Entugo flows)
  timeout: 60_000,
  expect: { timeout: 10_000 },

  // Global browser settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter (HTML + console)
  reporter: [["html"], ["list"]],

  // Chrome only (as requested)
  projects: [
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"],
        // Chrome-specific tweaks
        channel: "chrome",
        headless: true, // set to false for debugging
        viewport: { width: 1280, height: 720 },
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        // Loads from .env
        baseURL: process.env.CLIENT_URL,
      },
    },
    {
      name: "firefox-mobile",
      use: {
        browserName: "firefox",
        headless: true,

        // Mobile-like viewport
        viewport: { width: 390, height: 844 },

        // Mobile user agent
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) " +
          "AppleWebKit/605.1.15 (KHTML, like Gecko) " +
          "Version/16.0 Mobile/15E148 Safari/604.1",

        deviceScaleFactor: 2,
        hasTouch: true,
      },
    },
  ],
});

