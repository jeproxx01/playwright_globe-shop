import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';

config();

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],
  use: {
    baseURL: process.env.BASE_URL || 'https://shop.globe.com.ph',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  //  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  //  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
   // { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
   // { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
});