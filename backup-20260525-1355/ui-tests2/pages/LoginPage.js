const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#loginButton');
    this.accountMenuButton = page.getByRole('button', { name: 'Show/hide account menu' });
    this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/#/login`);
    await this.page.waitForTimeout(1000);
    
    // Клікаємо на Close Welcome Banner якщо є
    try {
      await this.page.getByRole('button', { name: 'Close Welcome Banner' }).click({ timeout: 2000 });
    } catch (e) {
      // Кнопка не знайдена - ігноруємо
    }
    
    // Клікаємо на dismiss cookie message якщо є
    try {
      await this.page.getByRole('button', { name: 'dismiss cookie message' }).click({ timeout: 2000 });
    } catch (e) {
      // Кнопка не знайдена - ігноруємо
    }
    
    await this.page.waitForTimeout(500);
  }

  async dismissDialogs() {
    try {
    await this.page.getByRole('dialog', { name: 'cookieconsent' }).click();
    await this.page.waitForTimeout(1000);
  await this.page.getByRole('button', { name: 'dismiss cookie message' }).click();
    } catch (e) {
      // Ignore if not present
    }
    await this.page.waitForTimeout(1000);
    try {
      await this.page.getByRole('button', { name: 'Close Welcome Banner' }).click({ timeout: 2000, force: true });
    } catch (e) {
      // Ignore if not present
    }
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async isLoaded() {
    await this.page.waitForTimeout(1000);
    const emailVisible = await this.emailInput.isVisible();
    const passwordVisible = await this.passwordInput.isVisible();
    return emailVisible && passwordVisible;
  }

  async logout() {
    await this.page.goto(`${this.baseUrl}/#/logout`);
    await this.page.waitForTimeout(1000);
  }
}

module.exports = LoginPage;
