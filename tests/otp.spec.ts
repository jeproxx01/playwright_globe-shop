import { test, expect } from '@playwright/test';
import { OtpPage } from './pages/otpPage';

test.describe('Globe Online Shop - New Plan Application', () => {
  let otpPage: OtpPage;

  test.beforeEach(async ({ page }) => {
    otpPage = new OtpPage(page);
  });

  test('Apply for New Plan → 599 → 12 Month Contract → Physical SIM', async ({ page }) => {
    await otpPage.goto();

    await otpPage.clickApplyForNewPlan();

    await otpPage.selectPlan599();

    await otpPage.selectTwelveMonthContract();

    await otpPage.selectPhysicalSim();

    await otpPage.clickNext();

    await otpPage.verifyModalAppears();

    await otpPage.clickAddPlanToCurrentAccount();

    await otpPage.verifyMobileNumberPrompt();
  });
});
