const BasePage = require('./BasePage');

class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.locator('#emailControl');
    this.passwordInput = page.locator('#passwordControl');
    this.passwordRepeatInput = page.locator('#repeatPasswordControl');
    this.securityQuestionSelect = page.locator('#mat-select-0');
    this.securityAnswerInput = page.locator('#securityAnswerControl');
    this.registerButton = page.locator('#registerButton');
    this.errorMessage = page
      .locator('.error')
      .or(page.locator('[class*="error"]'));
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/#/register`);
    await this.page.waitForTimeout(1000);

    // Клікаємо на Close Welcome Banner якщо є
    try {
      await this.page
        .getByRole('button', { name: 'Close Welcome Banner' })
        .click({ timeout: 2000 });
    } catch (e) {
      // Кнопка не знайдена - ігноруємо
    }

    // Клікаємо на dismiss cookie message якщо є
    try {
      await this.page
        .getByRole('button', { name: 'dismiss cookie message' })
        .click({ timeout: 2000 });
    } catch (e) {
      // Кнопка не знайдена - ігноруємо
    }

    await this.page.waitForTimeout(500);
  }

  // async dismissDialogs() {
  //   await this.page.getByRole('dialog', { name: 'cookieconsent' }).click();
  //   await this.page.waitForTimeout(1000);
  //   await this.page.getByRole('button', { name: 'dismiss cookie message' }).click();
  //   try {
  //     await this.page.getByRole('button', { name: 'Close Welcome Banner' }).click({ timeout: 2000, force: true });
  //   } catch (e) {
  //     // Ignore if not present
  //   }
  //   await this.page.waitForTimeout(500);
  //   try {
  //     await this.page.getByRole('button', { name: 'dismiss cookie message' }).click({ timeout: 2000 });
  //   } catch (e) {
  //     // Ignore if not present
  //   }
  //   await this.page.waitForTimeout(500);
  // }

  async register(
    email,
    password,
    passwordRepeat,
    securityQuestionId,
    securityAnswer
  ) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.passwordRepeatInput.fill(passwordRepeat);
    await this.page
      .locator('div')
      .filter({ hasText: 'Security Question' })
      .nth(4)
      .click();
    await this.page
      .getByRole('option', { name: "Mother's maiden name?" })
      .click();
    await this.page
      .getByRole('textbox', { name: 'Field for the answer to the' })
      .click();
    await this.page
      .getByRole('textbox', { name: 'Field for the answer to the' })
      .fill(securityAnswer);
    await this.page.waitForTimeout(500);
    await this.page
      .getByRole('button', { name: 'Button to complete the' })
      .click();
  }

  async isLoaded() {
    await this.page.waitForTimeout(1000);
    const emailVisible = await this.emailInput.isVisible();
    const passwordVisible = await this.passwordInput.isVisible();
    const registerVisible = await this.registerButton.isVisible();
    return emailVisible && passwordVisible && registerVisible;
  }

  async getErrorMessage() {
    await this.page.waitForTimeout(1000);
    const errorElement = await this.errorMessage.first();
    if (await errorElement.isVisible()) {
      return await errorElement.textContent();
    }
    return '';
  }

  async isRegistrationSuccessful() {
    await this.page.waitForTimeout(2000);
    const currentUrl = this.page.url();
    return !currentUrl.includes('register');
  }
}

module.exports = RegistrationPage;
