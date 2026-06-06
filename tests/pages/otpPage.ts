import { type Page, expect } from '@playwright/test';

export class OtpPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://shop.globe.com.ph/otp');
    await expect(this.page).toHaveURL('https://shop.globe.com.ph/otp');
  }

  async clickApplyForNewPlan() {
    const applyButton = this.page.getByRole('button', { name: /apply for a new plan/i }).or(
      this.page.getByText(/apply for a new plan/i)
    );
    await expect(applyButton).toBeVisible();
    await expect(applyButton).toBeEnabled();
    await applyButton.click();
  }

  async selectPlan599() {
    const planButton = this.page.getByRole('button', { name: /599/i }).or(
      this.page.locator('text=599')
    );
    await expect(planButton).toBeVisible();
    await expect(planButton).toBeEnabled();
    await planButton.click();
  }

  async selectTwelveMonthContract() {
    const radio = this.page.getByRole('radio', { name: /12 months/i }).or(
      this.page.getByText(/12 months/i)
    );
    await expect(radio).toBeVisible();
    await expect(radio).toBeEnabled();
    await radio.check();
    await expect(radio).toBeChecked();
  }

  async selectPhysicalSim() {
    const radio = this.page.getByRole('radio', { name: /physical sim/i }).or(
      this.page.getByText(/physical sim/i)
    );
    await expect(radio).toBeVisible();
    await expect(radio).toBeEnabled();
    await radio.check();
    await expect(radio).toBeChecked();
  }

  async clickNext() {
    const nextButton = this.page.getByRole('button', { name: /^next$/i });
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();
    await nextButton.click();
  }

  async verifyModalAppears() {
    const modal = this.page.getByRole('dialog').or(
      this.page.locator('[role="dialog"], .modal, [aria-modal="true"]')
    );
    await expect(modal).toBeVisible();
    await expect(modal).toBeEnabled();
    return modal;
  }

  async clickAddPlanToCurrentAccount() {
    const button = this.page.getByRole('button', { name: /add plan to current account/i }).or(
      this.page.getByText(/add plan to current account/i)
    );
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    await button.click();
  }

  async verifyMobileNumberPrompt() {
    const prompt = this.page.getByText(/enter your mobile number/i);
    await expect(prompt).toBeVisible();
  }
}
