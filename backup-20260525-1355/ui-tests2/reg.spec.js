// ============================================
// REGRESSION TESTS - Регресійні тести для перевірки різних варіантів доставки
// ============================================
// Цей файл містить регресійні тести для перевірки різних методів доставки при checkout

const { test, expect, describe } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');
const CartPage = require('./pages/CartPage');

const BASE_URL = 'http://localhost:3000';

describe('Regression Тести - Checkout Delivery Methods', () => {
  test('@reg @checkout @pay2 Сценарій Checkout з другим методом оплати (карта ************8108)', async ({ page }) => {
    console.log('🛒 Сценарій: Checkout з другим методом оплати');

    // Логін
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(1000);
    await loginPage.isLoaded();
    await loginPage.login('admin@juice-sh.op', 'admin123');
    await page.waitForTimeout(2000);

    // Використання Page Object Model для кошика
    const cartPage = new CartPage(page);

    // Додавання другого товару в кошик
    await cartPage.goto();
    await page.waitForTimeout(1000);
    await cartPage.addSecondItemToCart();
    await page.waitForTimeout(1000);

    // Виконання checkout з другим методом оплати
    await cartPage.checkoutWithSecondPayment();

    console.log('✅ Order complete message shown');

    // Логаут
    await loginPage.logout();
    console.log('✅ Тест завершено: checkout виконано з другим методом оплати');
  });

  test('@reg @checkout @delivery1 Сценарій Checkout з One Day Delivery', async ({ page }) => {
    console.log('🛒 Сценарій: Checkout з One Day Delivery');

    // Логін
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(1000);
    await loginPage.isLoaded();
    await loginPage.login('admin@juice-sh.op', 'admin123');
    await page.waitForTimeout(2000);

    // Використання Page Object Model для кошика
    const cartPage = new CartPage(page);

    // Додавання першого товару в кошик
    await cartPage.goto();
    await page.waitForTimeout(1000);
    await cartPage.addSecondItemToCart();
    await page.waitForTimeout(1000);

    // Виконання checkout з One Day Delivery
    await cartPage.checkoutWithOneDayDelivery();

    console.log('✅ Order complete message shown');

    // Логаут
    await loginPage.logout();
    console.log('✅ Тест завершено: checkout виконано з One Day Delivery');
  });

  test('@reg @checkout @delivery2 Сценарій Checkout з Fast Delivery', async ({ page }) => {
    console.log('🛒 Сценарій: Checkout з Fast Delivery');

    // Логін
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(1000);
    await loginPage.isLoaded();
    await loginPage.login('admin@juice-sh.op', 'admin123');
    await page.waitForTimeout(2000);

    // Використання Page Object Model для кошика
    const cartPage = new CartPage(page);

    // Додавання першого товару в кошик
    await cartPage.goto();
    await page.waitForTimeout(1000);
    await cartPage.addSecondItemToCart();
    await page.waitForTimeout(1000);

    // Виконання checkout з Fast Delivery
    await cartPage.checkoutWithFastDelivery();

    console.log('✅ Order complete message shown');

    // Логаут
    await loginPage.logout();
    console.log('✅ Тест завершено: checkout виконано з Fast Delivery');
  });

  test('@reg @checkout @delivery3 Сценарій Checkout з Standard Delivery', async ({ page }) => {
    console.log('🛒 Сценарій: Checkout з Standard Delivery');

    // Логін
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(1000);
    await loginPage.isLoaded();
    await loginPage.login('admin@juice-sh.op', 'admin123');
    await page.waitForTimeout(2000);

    // Використання Page Object Model для кошика
    const cartPage = new CartPage(page);

    // Додавання першого товару в кошик
    await cartPage.goto();
    await page.waitForTimeout(1000);
    await cartPage.addSecondItemToCart();
    await page.waitForTimeout(1000);

    // Виконання checkout з Standard Delivery
    await cartPage.checkoutWithStandardDelivery();

    console.log('✅ Order complete message shown');

    // Логаут
    await loginPage.logout();
    console.log('✅ Тест завершено: checkout виконано з Standard Delivery');
  });
});
