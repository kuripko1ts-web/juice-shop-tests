const { chromium } = require('playwright');

async function analyzeFiltrationLocators() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Переходимо на сторінку пошуку
    await page.goto('http://localhost:3000/#/search');
    await page.waitForTimeout(2000);

    // Закриваємо welcome banner та cookie message якщо є
    try {
      await page
        .getByRole('button', { name: 'Close Welcome Banner' })
        .click({ timeout: 2000 });
    } catch (e) {
      console.log('Welcome Banner не знайдено');
    }

    try {
      await page
        .getByRole('button', { name: 'dismiss cookie message' })
        .click({ timeout: 2000 });
    } catch (e) {
      console.log('Cookie message не знайдено');
    }

    await page.waitForTimeout(1000);

    console.log('=== АНАЛІЗ ЛОКАТОРІВ ДЛЯ ФІЛЬТРАЦІЇ ТА ПАГІНАЦІЇ ===\n');

    // Шукаємо елементи пагінації
    console.log('1. ПАГІНАЦІЯ (Paginator):');
    const paginator = page
      .locator('mat-paginator')
      .or(page.locator('.mat-mdc-paginator'));
    const paginatorVisible = await paginator.isVisible().catch(() => false);
    console.log(`   - Paginator visible: ${paginatorVisible}`);

    if (paginatorVisible) {
      const paginatorHTML = await paginator.innerHTML();
      console.log(`   - Paginator HTML length: ${paginatorHTML.length}`);

      // Шукаємо кнопки пагінації
      const prevButton = page
        .locator('button[aria-label*="Previous"]')
        .or(page.locator('button.mat-mdc-icon-button').first());
      const nextButton = page
        .locator('button[aria-label*="Next"]')
        .or(page.locator('button.mat-mdc-icon-button').nth(1));

      console.log(
        `   - Previous button visible: ${await prevButton.isVisible().catch(() => false)}`
      );
      console.log(
        `   - Next button visible: ${await nextButton.isVisible().catch(() => false)}`
      );

      // Шукаємо select для розміру сторінки
      const pageSizeSelect = page
        .locator('select')
        .or(page.locator('.mat-mdc-select'));
      console.log(
        `   - Page size select visible: ${await pageSizeSelect.isVisible().catch(() => false)}`
      );
    }

    // Шукаємо елементи сортування
    console.log('\n2. СОРТУВАННЯ (Sorting):');
    const sortButtons = page
      .locator('button')
      .filter({ hasText: /sort/i })
      .or(page.locator('[aria-label*="sort"]'))
      .or(page.locator('mat-select'));
    const sortCount = await sortButtons.count();
    console.log(`   - Знайдено ${sortCount} sort-related елементів`);

    for (let i = 0; i < Math.min(sortCount, 5); i++) {
      const elem = sortButtons.nth(i);
      const text = await elem.textContent().catch(() => 'N/A');
      const ariaLabel = await elem
        .getAttribute('aria-label')
        .catch(() => 'N/A');
      const className = await elem.getAttribute('class').catch(() => 'N/A');
      console.log(
        `   - Sort element ${i}: text="${text?.trim()}", aria-label="${ariaLabel}", class="${className}"`
      );
    }

    // Шукаємо елементи фільтрації
    console.log('\n3. ФІЛЬТРАЦІЯ (Filters):');

    // Шукаємо фільтри за категоріями
    const categoryFilters = page
      .locator('button')
      .filter({ hasText: /category|filter/i })
      .or(page.locator('[aria-label*="filter"]'))
      .or(page.locator('[aria-label*="category"]'));
    const filterCount = await categoryFilters.count();
    console.log(`   - Знайдено ${filterCount} filter-related елементів`);

    for (let i = 0; i < Math.min(filterCount, 5); i++) {
      const elem = categoryFilters.nth(i);
      const text = await elem.textContent().catch(() => 'N/A');
      const ariaLabel = await elem
        .getAttribute('aria-label')
        .catch(() => 'N/A');
      const className = await elem.getAttribute('class').catch(() => 'N/A');
      console.log(
        `   - Filter element ${i}: text="${text?.trim()}", aria-label="${ariaLabel}", class="${className}"`
      );
    }

    // Шукаємо всі select елементи (можуть бути для фільтрів)
    console.log('\n4. SELECT ЕЛЕМЕНТИ:');
    const allSelects = await page.locator('select').all();
    console.log(`   - Знайдено ${allSelects.length} select елементів`);

    for (let i = 0; i < Math.min(allSelects.length, 10); i++) {
      const select = allSelects[i];
      const id = await select.getAttribute('id').catch(() => 'N/A');
      const className = await select.getAttribute('class').catch(() => 'N/A');
      const visible = await select.isVisible();
      console.log(
        `   - Select ${i}: id="${id}", class="${className}", visible=${visible}`
      );
    }

    // Шукаємо mat-select елементи (Angular Material select)
    console.log('\n5. MAT-SELECT ЕЛЕМЕНТИ:');
    const matSelects = await page.locator('mat-select').all();
    console.log(`   - Знайдено ${matSelects.length} mat-select елементів`);

    for (let i = 0; i < Math.min(matSelects.length, 10); i++) {
      const matSelect = matSelects[i];
      const ariaLabel = await matSelect
        .getAttribute('aria-label')
        .catch(() => 'N/A');
      const className = await matSelect
        .getAttribute('class')
        .catch(() => 'N/A');
      const visible = await matSelect.isVisible();
      console.log(
        `   - Mat-select ${i}: aria-label="${ariaLabel}", class="${className}", visible=${visible}`
      );
    }

    // Шукаємо radio buttons (можуть бути для фільтрів)
    console.log('\n6. RADIO BUTTONS:');
    const radioButtons = await page.locator('input[type="radio"]').all();
    console.log(`   - Знайдено ${radioButtons.length} radio buttons`);

    for (let i = 0; i < Math.min(radioButtons.length, 10); i++) {
      const radio = radioButtons[i];
      const name = await radio.getAttribute('name').catch(() => 'N/A');
      const value = await radio.getAttribute('value').catch(() => 'N/A');
      const visible = await radio.isVisible();
      console.log(
        `   - Radio ${i}: name="${name}", value="${value}", visible=${visible}`
      );
    }

    // Шукаємо checkboxes (можуть бути для фільтрів)
    console.log('\n7. CHECKBOXES:');
    const checkboxes = await page.locator('input[type="checkbox"]').all();
    console.log(`   - Знайдено ${checkboxes.length} checkboxes`);

    for (let i = 0; i < Math.min(checkboxes.length, 10); i++) {
      const checkbox = checkboxes[i];
      const name = await checkbox.getAttribute('name').catch(() => 'N/A');
      const value = await checkbox.getAttribute('value').catch(() => 'N/A');
      const visible = await checkbox.isVisible();
      console.log(
        `   - Checkbox ${i}: name="${name}", value="${value}", visible=${visible}`
      );
    }

    // Зберігаємо скріншот
    await page.screenshot({ path: 'filtration-analysis.png', fullPage: true });
    console.log('\nСкріншот збережено: filtration-analysis.png');

    // Зберігаємо HTML для аналізу
    const htmlContent = await page.content();
    require('fs').writeFileSync('filtration-page.html', htmlContent);
    console.log('HTML збережено: filtration-page.html');
  } catch (error) {
    console.error('Помилка:', error);
  } finally {
    await browser.close();
  }
}

analyzeFiltrationLocators();
