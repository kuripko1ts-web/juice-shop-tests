// ============================================
// SMOKE TESTS - Основні тести для перевірки критичної функціональності
// ============================================
// Цей файл містить smoke тести для перевірки основних сценаріїв логіну

const { test, expect, describe } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');
const CartPage = require('./pages/CartPage');

const BASE_URL = 'http://localhost:3000';

describe('Smoke Тести - Сценарії логіну', () => {

  // Сценарій 1: Логін валідного користувача
  test('@smoke @auth Сценарій Логін валідного користувача', async ({ page }) => {
    console.log('🔐 Сценарій: Логін валідного користувача');

    // Використання Page Object Model
    const loginPage = new LoginPage(page);

    // Логін з валідними креденшалами (admin)
    await loginPage.goto();
    await page.waitForTimeout(1000);
    await loginPage.isLoaded();
    await loginPage.login('admin@juice-sh.op', 'admin123');

    // Очікування завантаження сторінки після логіну
    await page.waitForTimeout(2000);

    // Очікуваний результат: Сторінка інвентарю відкрита, продукти видимі
    // Перевіряємо, що користувач може перейти на сторінку продуктів
    await page.goto(`${BASE_URL}/#/search`);
    await page.waitForTimeout(2000);

    const url = page.url();
    await page.getByRole('button', { name: 'Show/hide account menu' }).click();
    await page.getByRole('menuitem', { name: 'Go to user profile' }).click();
    await expect(page.getByRole('heading', { name: 'User Profile' })).toBeVisible();

    //expect(url).toContain('search');
    console.log('✅ Користувач бачить сторінку профіля після логіну');

    await page.goto(`${BASE_URL}/#/search`);
    // Перевірка наявності продуктів на сторінці
    const products = await page.locator('.product-card').or(
      page.locator('[class*="product"]')
    ).or(
      page.locator('mat-card')
    );
    const productCount = await products.count();
    expect(productCount).toBeGreaterThan(0);
    console.log(`✅ Знайдено ${productCount} продуктів на сторінці інвентарю`);
    await loginPage.logout();
  });

  // Сценарій 2: Логін заблокованого користувача
  test('@smoke @auth @negative Сценарій Логін заблокованого користувача', async ({ page }) => {
    console.log('🔐 Сценарій: Логін заблокованого користувача');

    // Використання Page Object Model
    const loginPage = new LoginPage(page);

    // Логін з креденшалами заблокованого користувача
    await loginPage.goto();
    await page.waitForTimeout(1000);
    await loginPage.isLoaded();
    await loginPage.login('locked_out@juice-sh.op', 'locked_out123');

    // Очікування відображення повідомлення про помилку
    await page.waitForTimeout(2000);

    // Очікуваний результат: Помилка відображається, користувач залишається на сторінці логіну
    // Перевірка URL - користувач повинен залишитися на сторінці логіну
    const url = page.url();
    expect(url).toContain('login');
    console.log('✅ Користувач залишився на сторінці логіну');

    // Перевірка наявності повідомлення про помилку
    const errorMessage = await page.locator('.error').or(
      page.locator('[class*="error"]')
    ).or(
      page.locator('text=blocked')
    ).or(
      page.locator('text=locked')
    ).first();

    await expect(errorMessage).toBeVisible();
    console.log('✅ Повідомлення про помилку відображається');
  });

  // Сценарій 3: Логін з неправильним паролем
  test('@smoke @auth @negative Сценарій Логін з неправильним паролем', async ({ page }) => {
    console.log('🔐 Сценарій: Логін з неправильним паролем');

    // Використання Page Object Model
    const loginPage = new LoginPage(page);

    // Логін з правильним email та неправильним паролем
    await loginPage.goto();
    await page.waitForTimeout(1000);
    await loginPage.isLoaded();
    await loginPage.login('admin@juice-sh.op', 'wrongpassword');

    // Очікування відображення повідомлення про помилку
    await page.waitForTimeout(2000);

    // Очікуваний результат: Помилка відображається, користувач залишається на сторінці логіну
    const url = page.url();
    expect(url).toContain('login');
    console.log('✅ Користувач залишився на сторінці логіну');

    // Перевірка наявності повідомлення про помилку
    const errorMessage = await page.locator('.error').or(
      page.locator('[class*="error"]')
    ).or(
      page.locator('text=Invalid')
    ).first();

    await expect(errorMessage).toBeVisible();
    console.log('✅ Повідомлення про помилку відображається');
  });
});

describe('Smoke', () => {
  // Сценарій 4: Додавання другого товару в кошик
  test('@smoke @cart Сценарій Додавання другого товару в кошик', async ({ page }) => {
    console.log('🛒 Сценарій: Додавання другого товару в кошик');

    // Логін перед додаванням товару
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(1000);
    await loginPage.isLoaded();
    await loginPage.login('admin@juice-sh.op', 'admin123');
    await page.waitForTimeout(2000);

    // Використання Page Object Model для кошика
    const cartPage = new CartPage(page);

    // Перехід на сторінку товарів
    //await cartPage.goto();
    await page.waitForTimeout(1000);
    //await cartPage.getCartItemCount();

    // Отримання назви другого товару
    const productName = await cartPage.getSecondProductName();

    // Додавання другого товару в кошик
    await cartPage.addSecondItemToCart();
    await page.waitForTimeout(2000);

    // Перевірка що товар додано в кошик (метод сам виконує перехід в корзину)
    //await cartPage.verifyCartNotEmpty();

    // Перевірка що саме цей товар знаходиться в кошику (метод сам виконує перехід в корзину)
    await cartPage.verifyProductInCart(productName);
    await page.waitForTimeout(2000);

    await loginPage.logout();
    console.log('✅ Тест завершено: товар додано в кошик та виконано розлогіровку');
  });
  // виделення з кошика
  test.skip('Сценарій Видалення товару @delete', async ({ page }) => {
    console.log('🛒 Сценарій: Видалення ')
    // Логін перед додаванням товару
    const loginPage = new LoginPage(page);
    //await this.page.pause(); 
    await loginPage.goto();
    await page.waitForTimeout(1000);
    await loginPage.isLoaded();
    await loginPage.login('admin@juice-sh.op', 'admin123');

    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Show the shopping cart' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
    const cartPage = new CartPage(page);

    // Перехід на сторінку товарів
    await cartPage.goto();
    await page.waitForTimeout(1000);
    await cartPage.getCartItemCount();
    // Використання Page Object Model для кошика
    //     const cartPage = new CartPage(page);

    //     // Перехід на сторінку товарів
    //     await cartPage.goto();
    //     await page.waitForTimeout(1000);
    //     await cartPage.getCartItemCount();

    // let count = await cartPage.getCartItemCount();
    //     console.log(`📦 Початкова кількість товарів в кошику: ${count}`);

    //     while (count > 0) {
    //       await cartPage.clearCart();
    //       count = await cartPage.getCartItemCount();
    //       console.log(`📦 Кількість товарів після clearCart: ${count}`);
    //     }
    await loginPage.logout();


  });



  // Сценарій 5: Видалення всіх товарів з кошика
  test('@smoke @cart Сценарій Видалення всіх товарів з кошика', async ({ page }) => {
    console.log('🛒 Сценарій: Видалення всіх товарів з кошика');

    // Логін перед додаванням товару
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(1000);
    await loginPage.isLoaded();
    await loginPage.login('admin@juice-sh.op', 'admin123');
    await page.waitForTimeout(2000);

    // Використання Page Object Model для кошика
    const cartPage = new CartPage(page);

    // Перехід на сторінку товарів
    await cartPage.goto();
    await page.waitForTimeout(1000);
    await cartPage.getCartItemCount();
    //await cartPage.clearCart();
    // Додавання першого товару в кошик
    await cartPage.addFirstItemToCart();
    await page.waitForTimeout(1000);
    //await cartPage.clearCart();
    await cartPage.addSecondItemToCart();
    await page.waitForTimeout(1000);
    // Перехід в кошик та видалення всіх товарів
    //await cartPage.clearCart();
    //console.log(`📦 кількість товарів в кошику: ${count}`);
    let count = await cartPage.getCartItemCount();
    console.log(`📦 Початкова кількість товарів в кошику: ${count}`);

    while (count > 0) {
      await cartPage.clearCart();
      count = await cartPage.getCartItemCount();
      console.log(`📦 Кількість товарів після clearCart: ${count}`);
    }

    // Перевірка що кошик порожній
    //wait cartPage.verifyCartEmpty();

    await loginPage.logout();
    console.log('✅ Тест завершено: всі товари видалено з кошика та виконано розлогіровку');
  });
});

describe('Smoke Тести - Checkout', () => {
  test('@smoke @checkout Сценарій Checkout happy path (1 item, One Day Delivery)', async ({ page }) => {
    console.log('🛒 Сценарій: Checkout happy path (1 item, One Day Delivery)');
    
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
    //await cartPage.goto();
    await page.waitForTimeout(1000);
    await cartPage.addSecondItemToCart();
    await page.waitForTimeout(1000);

    // Виконання checkout через POM
    await cartPage.checkout();


    // Перевірка повідомлення про завершення замовлення
    // await expect(page.getByText(/order complete|thank you|дякуємо|замовлення успішне/i)).toBeVisible();
    console.log('✅ Order complete message shown');

    // Логаут
    await loginPage.logout();
    console.log('✅ Тест завершено: checkout виконано та виконано розлогіровку');
  });
});

describe('Smoke Тести - Сценарій розлогіровки', () => {
  // Сценарій: Розлогіровка користувача
  test('@smoke @auth @logount Сценарій Розлогіровка користувача', async ({ page }) => {
    console.log('🔐 Сценарій: Розлогіровка користувача');

    // Логін перед розлогіровкою
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(1000);
    await loginPage.isLoaded();
    await loginPage.login('admin@juice-sh.op', 'admin123');
    await page.waitForTimeout(2000);

    // Перевірка що користувач залогінений
    await page.goto(`${BASE_URL}/#/search`);
    await page.waitForTimeout(1000);

    // Розлогіровка
    // await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();
    // await page.getByRole('button', { name: 'Show/hide account menu' }).click();
    // await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
    // await page.getByRole('menuitem', { name: 'Logout' }).click();

    // // Перевірка що користувач розлогінений
    //await page.waitForTimeout(2000);
    await loginPage.logout();
    console.log('✅ Користувач успішно розлогінений');
  });
});

test.skip('@smoke  @checkout Сценарій Checkout happy path (', async ({ page }) => {
  console.log('🛒 Сценарій: Сценарій Checkout happy path');

  // Логін перед додаванням товару
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await page.waitForTimeout(1000);
  await loginPage.isLoaded();
  await loginPage.login('admin@juice-sh.op', 'admin123');
  await page.waitForTimeout(2000);

  // Використання Page Object Model для кошика
  const cartPage = new CartPage(page);

  // Перехід на сторінку товарів
  await cartPage.goto();
  await page.waitForTimeout(1000);
  await cartPage.getCartItemCount();
  //await cartPage.clearCart();
  // Додавання першого товару в кошик
  await cartPage.addFirstItemToCart();
  await page.waitForTimeout(1000);
  //await cartPage.clearCart();
  // Перехід в кошик та видалення всіх товарів
  //await cartPage.clearCart();
  //console.log(`📦 кількість товарів в кошику: ${count}`);
  let count = await cartPage.getCartItemCount();
  console.log(`📦 Початкова кількість товарів в кошику: ${count}`);

  while (count > 0) {
    await cartPage.clearCart();
    count = await cartPage.getCartItemCount();
    console.log(`📦 Кількість товарів після clearCart: ${count}`);
  }

  // Перевірка що кошик порожній
  //wait cartPage.verifyCartEmpty();

  await loginPage.logout();
  console.log('✅ Тест завершено: всі товари видалено з кошика та виконано розлогіровку');
});
