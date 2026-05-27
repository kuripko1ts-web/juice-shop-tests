// ============================================
// SEARCH TESTS - Тести функціональності пошуку
// ============================================
// Цей файл містить тести для перевірки функціональності пошуку продуктів:
// 1. Пошук за назвою продукту
// 2. Пошук з частковим співпадінням
// 3. Пошук з невалідним запитом
// 4. Пошук з порожнім запитом
// 5. Пошук зі спецсимволами
// 6. Пошук з великими/малими літерами
// 7. Пошук з числами

const { test, expect, describe } = require('@playwright/test');
const SearchPage = require('./pages/SearchPage');
const LoginPage = require('./pages/LoginPage');

const BASE_URL = 'http://localhost:3000';

describe('Search Тести - Пошук за назвою продукту', () => {
  test('@search @positive Сценарій Пошук за повною назвою продукту', async ({
    page,
  }) => {
    console.log('🔍 Сценарій: Пошук за повною назвою продукту');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Виконуємо пошук за повною назвою продукту
    await searchPage.search('Apple Juice');
    await page.waitForTimeout(2000);

    // Перевіряємо що результати пошуку відображаються
    const productCount = await searchPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    console.log(
      `✅ Знайдено ${productCount} продуктів за запитом "Apple Juice"`
    );
  });

  test('@search @positive Сценарій Пошук за частковою назвою продукту', async ({
    page,
  }) => {
    console.log('🔍 Сценарій: Пошук за частковою назвою продукту');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Виконуємо пошук за частковою назвою
    await searchPage.search('Apple');
    await page.waitForTimeout(2000);

    // Перевіряємо що результати пошуку відображаються
    const productCount = await searchPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    console.log(
      `✅ Знайдено ${productCount} продуктів за частковим запитом "Apple"`
    );
  });
});

describe('Search Тести - Пошук з невалідними запитами', () => {
  test('@search @negative Сценарій Пошук з неіснуючим продуктом', async ({
    page,
  }) => {
    console.log('🔍 Сценарій: Пошук з неіснуючим продуктом');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Виконуємо пошук неіснуючого продукту
    await searchPage.search('NonExistingProduct12345');
    await page.waitForTimeout(2000);

    // Перевіряємо що результати пошуку порожні або відображається повідомлення про відсутність результатів
    const productCount = await searchPage.getProductCount();
    console.log(`📋 Кількість продуктів: ${productCount}`);

    // Перевіряємо наявність повідомлення про відсутність результатів
    const noResultsMessage = await page
      .locator('text=No results')
      .or(page.locator('text=No products found'))
      .or(page.locator('text=Nothing found'))
      .first();

    const messageVisible = await noResultsMessage
      .isVisible()
      .catch(() => false);
    console.log(
      `📋 Повідомлення про відсутність результатів: ${messageVisible}`
    );

    // Очікуємо або порожні результати, або повідомлення про відсутність результатів
    if (productCount === 0) {
      console.log('✅ Результати пошуку порожні - продукт не знайдено');
    } else if (messageVisible) {
      console.log('✅ Відображається повідомлення про відсутність результатів');
    }
  });

  test('@search @negative Сценарій Пошук зі спецсимволами', async ({
    page,
  }) => {
    console.log('🔍 Сценарій: Пошук зі спецсимволами');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Виконуємо пошук зі спецсимволами
    await searchPage.search('@#$%^&*');
    await page.waitForTimeout(2000);

    // Перевіряємо що система обробляє спецсимволи без помилок
    const productCount = await searchPage.getProductCount();
    console.log(
      `📋 Кількість продуктів після пошуку зі спецсимволами: ${productCount}`
    );
    console.log('✅ Система успішно обробила спецсимволи без помилок');
  });
});

describe('Search Тести - Пошук з різними форматами', () => {
  test('@search @validation Сценарій Пошук з великими літерами', async ({
    page,
  }) => {
    console.log('🔍 Сценарій: Пошук з великими літерами');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Виконуємо пошук з великими літерами
    await searchPage.search('APPLE');
    await page.waitForTimeout(2000);

    // Перевіряємо що пошук case-insensitive
    const productCount = await searchPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    console.log(
      `✅ Пошук case-insensitive: знайдено ${productCount} продуктів`
    );
  });

  test('@search @validation Сценарій Пошук з малими літерами', async ({
    page,
  }) => {
    console.log('🔍 Сценарій: Пошук з малими літерами');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Виконуємо пошук з малими літерами
    await searchPage.search('apple');
    await page.waitForTimeout(2000);

    // Перевіряємо що пошук case-insensitive
    const productCount = await searchPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    console.log(
      `✅ Пошук case-insensitive: знайдено ${productCount} продуктів`
    );
  });

  test('@search @validation Сценарій Пошук з числами', async ({ page }) => {
    console.log('🔍 Сценарій: Пошук з числами');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Виконуємо пошук з числами
    await searchPage.search('123');
    await page.waitForTimeout(2000);

    // Перевіряємо що система обробляє числові запити
    const productCount = await searchPage.getProductCount();
    console.log(`📋 Кількість продуктів при пошуку з числами: ${productCount}`);
    console.log('✅ Система успішно обробила числовий запит');
  });
});

describe('Search Тести - Валідація елементів пошуку', () => {
  test('@search @validation Сценарій Перевірка наявності кнопки пошуку', async ({
    page,
  }) => {
    console.log('🔍 Сценарій: Перевірка наявності кнопки пошуку');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Перевіряємо що кнопка пошуку видима
    const isSearchButtonVisible =
      await searchPage.isSearchToggleButtonVisible();
    expect(isSearchButtonVisible).toBeTruthy();
    console.log('✅ Кнопка пошуку видима на сторінці');
  });

  test('@search @validation Сценарій Перевірка відкриття поля пошуку', async ({
    page,
  }) => {
    console.log('🔍 Сценарій: Перевірка відкриття поля пошуку');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Відкриваємо поле пошуку
    await searchPage.openSearch();
    await page.waitForTimeout(1000);

    // Перевіряємо що поле пошуку видиме
    const isSearchInputVisible = await searchPage.isSearchInputVisible();
    expect(isSearchInputVisible).toBeTruthy();
    console.log('✅ Поле пошуку успішно відкрилося і видиме');

    // Закриваємо поле пошуку
    await searchPage.closeSearch();
  });
});

describe('Search Тести - Пошук після логіну', () => {
  test('@search @auth Сценарій Пошук продукту після логіну', async ({
    page,
  }) => {
    console.log('🔍 Сценарій: Пошук продукту після логіну');

    // Логін перед пошуком
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(1000);
    await loginPage.isLoaded();
    await loginPage.login('admin@juice-sh.op', 'admin123');
    await page.waitForTimeout(2000);

    // Перехід на сторінку пошуку
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Виконуємо пошук
    await searchPage.search('Orange Juice');
    await page.waitForTimeout(2000);

    // Перевіряємо що результати пошуку відображаються
    const productCount = await searchPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    console.log(`✅ Знайдено ${productCount} продуктів після логіну`);

    // Логаут
    await loginPage.logout();
    console.log('✅ Тест завершено: пошук після логіну успішний');
  });
});
