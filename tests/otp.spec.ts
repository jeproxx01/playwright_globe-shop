import { test } from '@playwright/test';
import { OtpPage } from '../src/pages/otpPage.ts';

test.describe('Globe Online Shop - New Plan Application', () => {
  let otpPage: OtpPage;

  test.beforeEach(async ({ page }) => {
    otpPage = new OtpPage(page);
  });

  test('Apply for New Plan → 599 → 12 Month Contract → Physical SIM', async ({ page }) => {
    await test.step('Navigate to OTP page', async () => {
      await otpPage.goto();
    });

    await test.step('Apply for a new plan', async () => {
      await otpPage.clickApplyForNewPlan();
    });

    await test.step('Select the 599 plan', async () => {
      await otpPage.selectPlan599();
    });

    await test.step('Select 12 months contract period', async () => {
      await otpPage.selectTwelveMonthContract();
    });

    await test.step('Choose Physical SIM as sim type', async () => {
      await otpPage.selectPhysicalSim();
    });

    await test.step('Click Next button', async () => {
      await otpPage.clickNext();
    });

    await test.step('Verify modal appears', async () => {
      await otpPage.verifyModalAppears();
    });

    await test.step('Click "Add plan to current account"', async () => {
      await otpPage.clickAddPlanToCurrentAccount();
    });

    await test.step('Verify "Enter your mobile number" prompt is displayed', async () => {
      await otpPage.verifyMobileNumberPrompt();
    });
  });
});