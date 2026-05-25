const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
    this.addToBasketButton = page.getByRole('button', { name: 'Add to basket' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.firstProductCard = page.locator('.product-card').first();
    this.secondProductCard = page.locator('.product-card').nth(1);
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/#/search`);
    await this.page.waitForTimeout(1000);
  }

  async getSecondProductName() {
    await this.page.waitForTimeout(1000);
    const name = await this.page.locator('app-product.product:nth-child(2) > mat-card:nth-child(1) > article:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1)').textContent();
    return name ? name.trim() : '';
  }

  async addFirstItemToCart() {
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' }).getByLabel('Add to Basket').click();
    await this.page.waitForTimeout(1000);
  }

  async addSecondItemToCart() {
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('article').filter({ hasText: 'Apple Pomace' }).getByLabel('Add to Basket').click();
    await this.page.waitForTimeout(1000);
  }

  async goToBasket() {
    await this.basketButton.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyOnBasketPage() {
    await this.page.waitForTimeout(1000);
    const url = this.page.url();
    return url.includes('basket');
  }

  async getCartItemCount() {
    await this.page.waitForTimeout(1000);
    const counterText = await this.page.locator('.fa-layers-counter').textContent();
    return counterText ? parseInt(counterText.trim()) : 0;
  }

  async verifyCartNotEmpty() {
    await this.goToBasket();
    await this.page.waitForTimeout(1000);
    const items = await this.page.locator('.mat-row').count();
    if (items === 0) {
      throw new Error('Cart is empty');
    }
  }

  async verifyProductInCart(productName) {
    await this.goToBasket();
    await this.page.waitForTimeout(2000);
    const productInCart = await this.page.getByText(productName).isVisible();
    if (!productInCart) {
      throw new Error(`Product ${productName} not found in cart`);
    }
  }

  async clearCart() {
    await this.goToBasket();
    await this.page.waitForTimeout(1000);

    const removeButtons = await this.page.locator('.fa-layers-counter').textContent();

    if (removeButtons > 0) {
      await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
      await this.page.waitForTimeout(1000);
    }
  }

  async verifyCartEmpty() {
    await this.goToBasket();
    await this.page.waitForTimeout(1000);
    const items = await this.page.locator('.mat-row').count();
    if (items > 0) {
      throw new Error('Cart is not empty');
    }
  }

  async checkout() {
    await this.goToBasket();
    await this.page.waitForTimeout(1000);
    await this.checkoutButton.click();
    await this.page.waitForTimeout(1000);
    await this.page.getByLabel('', { exact: true }).check();
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByLabel('', { exact: true })).toBeVisible();
    await this.page.getByRole('button', { name: 'Proceed to payment selection' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('row', { name: 'One Day Delivery 0.99¤ 1 Days' }).getByLabel('', { exact: true }).check();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Proceed to delivery method' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('row', { name: '************4368' }).getByLabel('', { exact: true }).check();
    await this.page.getByRole('button', { name: 'Proceed to review' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Complete your purchase' }).click();
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();


    //     //await this.page.waitForTimeout(2000);

    //     // Select delivery address (first option)
    //     //await expect(page.getByRole('cell', { name: 'Test Street, Test, Test, 4711' })).toBeVisible();
    //     await page.getByLabel('', { exact: true }).check();
    //     await expect(page.getByRole('button', { name: 'Proceed to payment selection' })).toBeVisible();
    //     await page.getByRole('button', { name: 'Proceed to payment selection' }).click();
    //     //await this.page.waitForTimeout(1000);

    // await expect(page.getByRole('cell', { name: 'One Day Delivery' })).toBeVisible();
    //   await page.getByRole('row', { name: 'One Day Delivery 0.99¤ 1 Days' }).getByLabel('', { exact: true }).check();
    //   await expect(page.getByRole('button', { name: 'Proceed to delivery method' })).toBeVisible();
    //   await page.getByRole('button', { name: 'Proceed to delivery method' }).click();
    //   await page.getByRole('row', { name: '************4368' }).getByLabel('', { exact: true }).check();
    //   await page.getByRole('button', { name: 'Proceed to review' }).click();
    //   await page.getByRole('button', { name: 'Complete your purchase' }).click();
    //   await expect(page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
  }

  async checkoutWithOneDayDelivery() {
    await this.goToBasket();
    await this.page.waitForTimeout(1000);
    await this.checkoutButton.click();
    await this.page.waitForTimeout(1000);
    await this.page.getByLabel('', { exact: true }).check();
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByLabel('', { exact: true })).toBeVisible();
    await this.page.getByRole('button', { name: 'Proceed to payment selection' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('row', { name: 'One Day Delivery 0.99¤ 1 Days' }).getByLabel('', { exact: true }).check();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Proceed to delivery method' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('row', { name: '************4368' }).getByLabel('', { exact: true }).check();
    await this.page.getByRole('button', { name: 'Proceed to review' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Complete your purchase' }).click();
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
  }

  async checkoutWithFastDelivery() {
    await this.goToBasket();
    await this.page.waitForTimeout(1000);
    await this.checkoutButton.click();
    await this.page.waitForTimeout(1000);

    await this.page.getByLabel('', { exact: true }).check();
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByLabel('', { exact: true })).toBeVisible();
    await this.page.getByRole('button', { name: 'Proceed to payment selection' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('row', { name: 'Fast Delivery 0.50¤ 3 Days' }).getByLabel('', { exact: true }).check();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Proceed to delivery method' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('row', { name: '************4368' }).getByLabel('', { exact: true }).check();
    await this.page.getByRole('button', { name: 'Proceed to review' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Complete your purchase' }).click();
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
  }

  async checkoutWithStandardDelivery() {
    await this.goToBasket();
    await this.page.waitForTimeout(1000);
    await this.checkoutButton.click();
    await this.page.waitForTimeout(1000);

    await this.page.getByLabel('', { exact: true }).check();
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByLabel('', { exact: true })).toBeVisible();
    await this.page.getByRole('button', { name: 'Proceed to payment selection' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('row', { name: 'Standard Delivery 0.00¤ 5 Days' }).getByLabel('', { exact: true }).check();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Proceed to delivery method' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('row', { name: '************4368' }).getByLabel('', { exact: true }).check();
    await this.page.getByRole('button', { name: 'Proceed to review' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Complete your purchase' }).click();
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
  }

  async checkoutWithSecondPayment() {
    await this.goToBasket();
    await this.page.waitForTimeout(1000);
    await this.checkoutButton.click();
    await this.page.waitForTimeout(1000);

    await this.page.getByLabel('', { exact: true }).check();
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByLabel('', { exact: true })).toBeVisible();
    await this.page.getByRole('button', { name: 'Proceed to payment selection' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('row', { name: 'Standard Delivery 0.00¤ 5 Days' }).getByLabel('', { exact: true }).check();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Proceed to delivery method' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('row', { name: '************8108' }).getByLabel('', { exact: true }).check();
    await this.page.getByRole('button', { name: 'Proceed to review' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Complete your purchase' }).click();
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
  }
}

module.exports = CartPage;
