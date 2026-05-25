class BasePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'http://localhost:3000';
  }

  async goto(path) {
    await this.page.goto(`${this.baseUrl}${path}`);
    await this.page.waitForTimeout(1000);
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle() {
    return await this.page.title();
  }
}

module.exports = BasePage;
