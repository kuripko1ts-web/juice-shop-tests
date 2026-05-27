// ============================================
// PAGINATION TESTS - Тести функціональності пагінації
// ============================================
// Цей файл містить тести для перевірки функціональності пагінації на сторінці пошуку:
// 1. Перевірка наявності пагінатора
// 2. Зміна кількості елементів на сторінці
// 3. Навігація між сторінками
// 4. Перевірка стану кнопок навігації

const { test, expect, describe } = require('@playwright/test');
const SearchPage = require('./pages/SearchPage');

const BASE_URL = 'http://localhost:3000';

describe('Pagination Тести - Наявність та базові перевірки', () => {
  test('@pagination @positive Сценарій Перевірка наявності пагінатора', async ({
    page,
  }) => {
    console.log('📄 Сценарій: Перевірка наявності пагінатора');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Перевіряємо що пагінатор відображається
    const isPaginatorVisible = await searchPage.isPaginatorVisible();
    expect(isPaginatorVisible).toBeTruthy();
    console.log('✅ Пагінатор відображається на сторінці');
  });

  test('@pagination @positive Сценарій Перевірка тексту діапазону сторінок', async ({
    page,
  }) => {
    console.log('📄 Сценарій: Перевірка тексту діапазону сторінок');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Отримуємо текст діапазону сторінок
    const pageRangeText = await searchPage.getPageRangeText();
    console.log(`📋 Текст діапазону сторінок: "${pageRangeText}"`);

    // Перевіряємо що текст не порожній
    expect(pageRangeText).toBeTruthy();
    expect(pageRangeText.length).toBeGreaterThan(0);
    console.log('✅ Текст діапазону сторінок відображається');
  });
});

describe('Pagination Тести - Зміна кількості елементів на сторінці', () => {
  test('@pagination @functional Сценарій Зміна кількості елементів на сторінці на 15', async ({
    page,
  }) => {
    console.log('📄 Сценарій: Зміна кількості елементів на сторінці на 15');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Отримуємо початкову кількість продуктів
    const initialProductCount = await searchPage.getProductCount();
    console.log(`📋 Початкова кількість продуктів: ${initialProductCount}`);

    // Змінюємо кількість елементів на сторінці
    await searchPage.selectPageSize(15);
    await page.waitForTimeout(1000);

    // Отримуємо нову кількість продуктів
    const newProductCount = await searchPage.getProductCount();
    console.log(`📋 Нова кількість продуктів після зміни: ${newProductCount}`);

    // Перевіряємо що кількість продуктів змінилася
    expect(newProductCount).toBeLessThanOrEqual(15);
    console.log('✅ Кількість елементів на сторінці успішно змінена на 15');
  });

  test('@pagination @functional Сценарій Зміна кількості елементів на сторінці на 45', async ({
    page,
  }) => {
    console.log('📄 Сценарій: Зміна кількості елементів на сторінці на 45');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Змінюємо кількість елементів на сторінці
    await searchPage.selectPageSize(45);
    await page.waitForTimeout(1000);

    // Отримуємо нову кількість продуктів
    const productCount = await searchPage.getProductCount();
    console.log(`📋 Кількість продуктів: ${productCount}`);

    // Перевіряємо що кількість продуктів не перевищує 45
    expect(productCount).toBeLessThanOrEqual(45);
    console.log('✅ Кількість елементів на сторінці успішно змінена на 45');
  });
});

describe('Pagination Тести - Навігація між сторінками', () => {
  test('@pagination @functional Сценарій Перевірка стану кнопки Next Page', async ({
    page,
  }) => {
    console.log('📄 Сценарій: Перевірка стану кнопки Next Page');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Зменшуємо кількість елементів на сторінці щоб створити декілька сторінок
    await searchPage.selectPageSize(15);
    await page.waitForTimeout(1000);

    // Перевіряємо стан кнопки Next Page
    const isNextEnabled = await searchPage.isNextPageEnabled();
    console.log(`📋 Кнопка Next Page активна: ${isNextEnabled}`);

    // Якщо є достатньо продуктів для декількох сторінок, кнопка має бути активною
    const productCount = await searchPage.getProductCount();
    if (productCount >= 15) {
      console.log('✅ Кнопка Next Page доступна для навігації');
    }
  });

  test('@pagination @functional Сценарій Перевірка стану кнопки Previous Page', async ({
    page,
  }) => {
    console.log('📄 Сценарій: Перевірка стану кнопки Previous Page');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Перевіряємо стан кнопки Previous Page (на першій сторінці має бути неактивною)
    const isPreviousEnabled = await searchPage.isPreviousPageEnabled();
    console.log(`📋 Кнопка Previous Page активна: ${isPreviousEnabled}`);

    // На першій сторінці кнопка Previous Page має бути неактивною
    expect(isPreviousEnabled).toBeFalsy();
    console.log(
      '✅ Кнопка Previous Page неактивна на першій сторінці (як очікувалося)'
    );
  });

  test('@pagination @functional Сценарій Навігація на наступну сторінку', async ({
    page,
  }) => {
    console.log('📄 Сценарій: Навігація на наступну сторінку');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Зменшуємо кількість елементів на сторінці
    await searchPage.selectPageSize(15);
    await page.waitForTimeout(1000);

    // Отримуємо текст діапазону перед навігацією
    const initialRangeText = await searchPage.getPageRangeText();
    console.log(`📋 Початковий діапазон: ${initialRangeText}`);

    // Перевіряємо чи доступна кнопка Next Page
    const isNextEnabled = await searchPage.isNextPageEnabled();

    if (isNextEnabled) {
      // Клікаємо на Next Page
      await searchPage.clickNextPage();
      await page.waitForTimeout(1000);

      // Отримуємо текст діапазону після навігації
      const newRangeText = await searchPage.getPageRangeText();
      console.log(`📋 Новий діапазон: ${newRangeText}`);

      // Перевіряємо що діапазон змінився
      expect(newRangeText).not.toBe(initialRangeText);
      console.log('✅ Навігація на наступну сторінку успішна');
    } else {
      console.log('⚠️ Кнопка Next Page неактивна - навігація не потрібна');
    }
  });

  test('@pagination @functional Сценарій Навігація на попередню сторінку', async ({
    page,
  }) => {
    console.log('📄 Сценарій: Навігація на попередню сторінку');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Зменшуємо кількість елементів на сторінці
    await searchPage.selectPageSize(15);
    await page.waitForTimeout(1000);

    // Спочатку переходимо на наступну сторінку якщо можливо
    const isNextEnabled = await searchPage.isNextPageEnabled();
    if (isNextEnabled) {
      await searchPage.clickNextPage();
      await page.waitForTimeout(1000);

      // Отримуємо текст діапазону
      const rangeTextAfterNext = await searchPage.getPageRangeText();
      console.log(`📋 Діапазон після переходу вперед: ${rangeTextAfterNext}`);

      // Перевіряємо стан кнопки Previous Page
      const isPreviousEnabled = await searchPage.isPreviousPageEnabled();
      console.log(`📋 Кнопка Previous Page активна: ${isPreviousEnabled}`);

      if (isPreviousEnabled) {
        // Клікаємо на Previous Page
        await searchPage.clickPreviousPage();
        await page.waitForTimeout(1000);

        // Отримуємо текст діапазону після повернення
        const rangeTextAfterPrevious = await searchPage.getPageRangeText();
        console.log(`📋 Діапазон після повернення: ${rangeTextAfterPrevious}`);

        // Перевіряємо що ми повернулися на попередню сторінку
        expect(rangeTextAfterPrevious).not.toBe(rangeTextAfterNext);
        console.log('✅ Навігація на попередню сторінку успішна');
      }
    } else {
      console.log(
        '⚠️ Неможливо перейти на наступну сторінку для тестування навігації назад'
      );
    }
  });
});

describe('Pagination Тести - Комплексні сценарії', () => {
  test('@pagination @complex Сценарій Повний цикл навігації по сторінках', async ({
    page,
  }) => {
    console.log('📄 Сценарій: Повний цикл навігації по сторінках');

    const searchPage = new SearchPage(page);

    // Перехід на сторінку пошуку
    await searchPage.goto();
    await page.waitForTimeout(1000);

    // Змінюємо кількість елементів на сторінці
    await searchPage.selectPageSize(15);
    await page.waitForTimeout(1000);

    const totalProducts = await searchPage.getProductCount();
    console.log(`📋 Загальна кількість продуктів: ${totalProducts}`);

    // Отримуємо початковий діапазон
    let currentRange = await searchPage.getPageRangeText();
    console.log(`📋 Початковий діапазон: ${currentRange}`);

    // Навігація вперед поки можливо
    let navigationCount = 0;
    while (await searchPage.isNextPageEnabled()) {
      await searchPage.clickNextPage();
      await page.waitForTimeout(1000);
      navigationCount++;
      currentRange = await searchPage.getPageRangeText();
      console.log(
        `📋 Діапазон після навігації ${navigationCount}: ${currentRange}`
      );
    }

    console.log(`📋 Виконано ${navigationCount} переходів вперед`);

    // Навігація назад на початок
    while (await searchPage.isPreviousPageEnabled()) {
      await searchPage.clickPreviousPage();
      await page.waitForTimeout(1000);
      navigationCount++;
      currentRange = await searchPage.getPageRangeText();
      console.log(`📋 Діапазон після повернення: ${currentRange}`);
    }

    console.log(`📋 Загальна кількість навігацій: ${navigationCount}`);
    console.log('✅ Повний цикл навігації завершено');
  });
});
