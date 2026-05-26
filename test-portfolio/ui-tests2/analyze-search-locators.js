const { chromium } = require('playwright');

async function analyzeSearchLocators() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Переходимо на сторінку пошуку
    await page.goto('http://localhost:3000/#/search');
    await page.waitForTimeout(2000);
    
    // Закриваємо welcome banner та cookie message якщо є
    try {
      await page.getByRole('button', { name: 'Close Welcome Banner' }).click({ timeout: 2000 });
    } catch (e) {
      console.log('Welcome Banner не знайдено');
    }
    
    try {
      await page.getByRole('button', { name: 'dismiss cookie message' }).click({ timeout: 2000 });
    } catch (e) {
      console.log('Cookie message не знайдено');
    }
    
    await page.waitForTimeout(1000);
    
    console.log('=== АНАЛІЗ ЛОКАТОРІВ ДЛЯ ПОШУКУ ===\n');
    
    // Аналіз кнопки search-toggle
    console.log('1. КНОПКА SEARCH-TOGGLE:');
    const searchToggle = page.locator('.search-toggle');
    const isVisible = await searchToggle.isVisible();
    console.log(`   - search-toggle visible: ${isVisible}`);
    
    if (isVisible) {
      // Клікаємо на кнопку пошуку щоб відкрити модальне вікно
      console.log('   - Клікаємо на search-toggle...');
      await searchToggle.click();
      await page.waitForTimeout(2000);
      
      // Аналізуємо що з'явилося після кліку
      console.log('\n2. ПОСЛЯ КЛІКУ НА SEARCH-TOGGLE:');
      
      // Шукаємо модальне вікно пошуку
      const searchDialog = page.locator('[role="dialog"]').or(page.locator('.mat-dialog-container'));
      const dialogVisible = await searchDialog.isVisible();
      console.log(`   - Dialog visible: ${dialogVisible}`);
      
      // Аналіз input полів в модальному вікні
      const allInputs = await page.locator('input').all();
      console.log(`   - Знайдено ${allInputs.length} input елементів`);
      for (let i = 0; i < allInputs.length; i++) {
        const input = allInputs[i];
        const id = await input.getAttribute('id');
        const type = await input.getAttribute('type');
        const placeholder = await input.getAttribute('placeholder');
        const className = await input.getAttribute('class');
        const visible = await input.isVisible();
        console.log(`   - Input ${i}: type="${type}", id="${id}", placeholder="${placeholder}", class="${className}", visible=${visible}`);
      }
      
      // Аналіз кнопок в модальному вікні
      const allButtons = await page.locator('button').all();
      console.log(`   - Знайдено ${allButtons.length} button елементів`);
      for (let i = 0; i < Math.min(10, allButtons.length); i++) {
        const btn = allButtons[i];
        const text = await btn.textContent();
        const className = await btn.getAttribute('class');
        const visible = await btn.isVisible();
        console.log(`   - Button ${i}: text="${text.trim()}", class="${className}", visible=${visible}`);
      }
      
      // Зберігаємо скріншот після кліку
      await page.screenshot({ path: 'search-after-click.png' });
      console.log('\nСкріншот після кліку збережено: search-after-click.png');
    }
    
    // Аналіз результатів пошуку на сторінці
    console.log('\n3. РЕЗУЛЬТАТИ ПОШУКУ НА СТОРІНЦІ:');
    const productCards = await page.locator('.product-card').all();
    if (productCards.length > 0) {
      console.log(`   - Знайдено ${productCards.length} product-card елементів`);
    } else {
      console.log('   - .product-card не знайдено');
    }
    
    const matCards = await page.locator('mat-card').all();
    if (matCards.length > 0) {
      console.log(`   - Знайдено ${matCards.length} mat-card елементів`);
    } else {
      console.log('   - mat-card не знайдено');
    }
    
    // Шукаємо елементи продуктів
    const products = await page.locator('[class*="product"]').all();
    console.log(`   - Знайдено ${products.length} елементів з "product" в класі`);
    
    // Зберігаємо HTML для аналізу
    const htmlContent = await page.content();
    require('fs').writeFileSync('search-page-detailed.html', htmlContent);
    console.log('HTML збережено: search-page-detailed.html');
    
  } catch (error) {
    console.error('Помилка:', error);
  } finally {
    await browser.close();
  }
}

analyzeSearchLocators();
