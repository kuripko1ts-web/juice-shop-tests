const BasePage = require('./BasePage');

class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchToggleButton = page.locator('.search-toggle');
    this.searchInput = page.locator('input[type="text"].ng-untouched');
    this.searchCloseButton = page.locator('.search-close');
    this.productCards = page.locator('mat-card');
    this.addToBasketButtons = page.locator('button').filter({ hasText: 'Add to Basket' });
    
    // Pagination locators
    this.paginator = page.locator('mat-paginator').or(page.locator('.mat-mdc-paginator'));
    this.pageSizeSelect = page.locator('.mat-mdc-paginator mat-select').or(page.locator('.mat-mdc-paginator .mat-mdc-select'));
    this.previousPageButton = page.locator('.mat-mdc-paginator button[aria-label*="Previous page"]').or(page.locator('.mat-mdc-paginator button[aria-label*="previous"]'));
    this.nextPageButton = page.locator('.mat-mdc-paginator button[aria-label*="Next page"]').or(page.locator('.mat-mdc-paginator button[aria-label*="next"]'));
    this.pageRangeLabel = page.locator('.mat-mdc-paginator-range-label');
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

  // Pagination methods
  async isPaginatorVisible() {
    return await this.paginator.isVisible().catch(() => false);
  }

  async getPageRangeText() {
    return await this.pageRangeLabel.textContent().catch(() => '');
  }

  async selectPageSize(size) {
    // Закриваємо snackbar якщо він відкритий
    try {
      const snackbar = this.page.locator('.mat-mdc-snack-bar-container');
      if (await snackbar.isVisible()) {
        const dismissButton = snackbar.locator('button').first();
        await dismissButton.click({ timeout: 1000 });
        await this.page.waitForTimeout(500);
      }
    } catch (e) {
      // Snackbar не знайдено або не відображається
    }

    // Використовуємо JavaScript для кліку щоб обійти touch target
    await this.pageSizeSelect.evaluate(el => el.click());
    await this.page.waitForTimeout(1000);
    
    // Select the option from the dropdown using getByRole
    const option = this.page.getByRole('option', { name: size.toString() });
    await option.click({ timeout: 5000 });
    await this.page.waitForTimeout(1000);
  }

  async clickNextPage() {
    // Закриваємо snackbar якщо він відкритий
    try {
      const snackbar = this.page.locator('.mat-mdc-snack-bar-container');
      if (await snackbar.isVisible()) {
        const dismissButton = snackbar.locator('button').first();
        await dismissButton.click({ timeout: 1000 });
        await this.page.waitForTimeout(500);
      }
    } catch (e) {
      // Snackbar не знайдено або не відображається
    }

    await this.nextPageButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickPreviousPage() {
    // Закриваємо snackbar якщо він відкритий
    try {
      const snackbar = this.page.locator('.mat-mdc-snack-bar-container');
      if (await snackbar.isVisible()) {
        const dismissButton = snackbar.locator('button').first();
        await dismissButton.click({ timeout: 1000 });
        await this.page.waitForTimeout(500);
      }
    } catch (e) {
      // Snackbar не знайдено або не відображається
    }

    await this.previousPageButton.click();
    await this.page.waitForTimeout(1000);
  }

  async isNextPageEnabled() {
    try {
      const isDisabled = await this.nextPageButton.getAttribute('aria-disabled');
      return isDisabled !== 'true';
    } catch (e) {
      return false;
    }
  }

  async isPreviousPageEnabled() {
    try {
      const isDisabled = await this.previousPageButton.getAttribute('aria-disabled');
      return isDisabled !== 'true';
    } catch (e) {
      return false;
    }
  }
}

module.exports = SearchPage;
