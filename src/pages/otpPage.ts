import { type Page, expect, type Locator } from '@playwright/test';

export class OtpPage {
  readonly page: Page;
  readonly path: string = '/otp';

  readonly applyForNewPlanButton: Locator;
  readonly plan599Button: Locator;
  readonly twelveMonthsRadio: Locator;
  readonly physicalSimRadio: Locator;
  readonly nextButton: Locator;
  readonly modal: Locator;
  readonly addPlanToCurrentAccountButton: Locator;
  readonly enterMobileNumberText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.applyForNewPlanButton = page
      .getByRole('button', { name: /apply for a new plan/i })
      .or(page.getByText(/apply for a new plan/i));
    this.plan599Button = page
      .getByRole('button', { name: /599/i })
      .or(page.locator('text=599'));
    this.twelveMonthsRadio = page
      .getByRole('radio', { name: /12 months/i })
      .or(page.getByText(/12 months/i));
    this.physicalSimRadio = page
      .getByRole('radio', { name: /physical sim/i })
      .or(page.getByText(/physical sim/i));
    this.nextButton = page.getByRole('button', { name: /^next$/i });
    this.modal = page
      .getByRole('dialog')
      .or(page.locator('[role="dialog"], .modal, [aria-modal="true"]'));
    this.addPlanToCurrentAccountButton = page.getByRole('button', { name: /add plan to current account/i });
    this.enterMobileNumberText = page.getByText(/enter your mobile number/i);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.path);
    await this.page.waitForLoadState('networkidle');
  }

  async clickApplyForNewPlan(): Promise<void> {
    await this.applyForNewPlanButton.click();
  }

  async selectPlan599(): Promise<void> {
    await this.plan599Button.click();
  }

  async selectTwelveMonthContract(): Promise<void> {
    await this.twelveMonthsRadio.check();
  }

  async selectPhysicalSim(): Promise<void> {
    await this.physicalSimRadio.check();
  }

  async clickNext(): Promise<void> {
    await this.nextButton.click();
  }

  async verifyModalAppears(): Promise<void> {
    await expect(this.modal).toBeVisible();
  }

  async clickAddPlanToCurrentAccount(): Promise<void> {
    await this.addPlanToCurrentAccountButton.click();
  }

  async verifyMobileNumberPrompt(): Promise<void> {
    await expect(this.enterMobileNumberText).toBeVisible();
  }
}