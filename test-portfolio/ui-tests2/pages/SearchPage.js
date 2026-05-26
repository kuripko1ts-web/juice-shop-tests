const BasePage = require('./BasePage');

class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchToggleButton = page.locator('.search-toggle');
    this.searchInput = page.locator('input[type="text"].ng-untouched');
    this.searchCloseButton = page.locator('.search-close');
    this.productCards = page.locator('mat-card');
    this.addToBasketButtons = page.locator('button').filter({ hasText: 'Add to Basket' });
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/#/search`);
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

  async openSearch() {
    await this.searchToggleButton.click();
    await this.page.waitForTimeout(1000);
  }

  async closeSearch() {
    await this.searchCloseButton.click();
    await this.page.waitForTimeout(1000);
  }

  async search(searchTerm) {
    await this.openSearch();
    await this.searchInput.fill(searchTerm);
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(2000);
  }

  async getProductCount() {
    return await this.productCards.count();
  }

  async getAddToBasketButtonCount() {
    return await this.addToBasketButtons.count();
  }

  async isSearchInputVisible() {
    return await this.searchInput.isVisible();
  }

  async isSearchToggleButtonVisible() {
    return await this.searchToggleButton.isVisible();
  }
}

module.exports = SearchPage;
