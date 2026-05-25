// ============================================
// REGISTRATION TESTS - Тести реєстрації користувачів
// ============================================
// Цей файл містить тести для перевірки функціональності реєстрації:
// 1. Реєстрація з валідними даними
// 2. Реєстрація з невалідними даними
// 3. Валідація полів

const { test, expect, describe } = require('@playwright/test');
const RegistrationPage = require('./pages/RegistrationPage');
const LoginPage = require('./pages/LoginPage');
const credentials = require('./testData/credentials');

const BASE_URL = 'http://localhost:3000';

describe('Registration Тести - Реєстрація з валідними даними', () => {
  test('@registration @positive Сценарій Реєстрація з валідними даними', async ({ page }) => {
    console.log('📝 Сценарій: Реєстрація з валідними даними');

    const registrationPage = new RegistrationPage(page);
    
    // Генерація унікальних даних для реєстрації
    const userCredentials = credentials.generateUserCredentials();
    const timestamp = Date.now();
    const email = `testuser${timestamp}@test.com`;
    const password = 'TestPass123!';
    const passwordRepeat = 'TestPass123!';
    const securityQuestionId = 1;
    const securityAnswer = 'Test';

    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);

    // Перехід на сторінку реєстрації
    await registrationPage.goto();
    await page.waitForTimeout(1000);
    await registrationPage.isLoaded();

    // Заповнення форми реєстрації
    await registrationPage.register(email, password, passwordRepeat, securityQuestionId, securityAnswer);
    await page.waitForTimeout(2000);

    // Перевірка успішної реєстрації (перенаправлення з сторінки реєстрації)
    const isSuccessful = await registrationPage.isRegistrationSuccessful();
    expect(isSuccessful).toBeTruthy();
    console.log('✅ Користувач успішно зареєстрований');

    // Перевірка можливості логіну з новими креденшалами
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(1000);
    await loginPage.isLoaded();
    await loginPage.login(email, password);
    await page.waitForTimeout(2000);

    // Перевірка успішного логіну
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('login');
    console.log('✅ Користувач успішно залогінений після реєстрації');

    // Логаут
    await loginPage.logout();
    console.log('✅ Тест завершено: реєстрація та логін успішні');
  });
});

describe('Registration Тести - Реєстрація з невалідними даними', () => {
  test('@registration @negative Сценарій Реєстрація з існуючим email', async ({ page }) => {
    console.log('📝 Сценарій: Реєстрація з існуючим email');

    const registrationPage = new RegistrationPage(page);

    // Спроба реєстрації з існуючим email (admin)
    const email = 'admin@juice-sh.op';
    const password = 'admin123';
    const passwordRepeat = 'admin123';
    const securityQuestionId = 1;
    const securityAnswer = 'Test';

    console.log(`📧 Email: ${email}`);

    await registrationPage.goto();
    await page.waitForTimeout(1000);
    await registrationPage.isLoaded();

    await registrationPage.register(email, password, passwordRepeat, securityQuestionId, securityAnswer);
    await page.waitForTimeout(2000);

    // Перевірка, що реєстрація не відбулася
    const isSuccessful = await registrationPage.isRegistrationSuccessful();
    expect(isSuccessful).toBeFalsy();
    console.log('✅ Реєстрація з існуючим email заблокована');

    // Перевірка наявності повідомлення про помилку
    const errorMessage = await registrationPage.getErrorMessage();
    console.log(`📋 Повідомлення про помилку: ${errorMessage}`);
    expect(errorMessage.length).toBeGreaterThan(0);
  });

  test('@registration @negative Сценарій Реєстрація з невідповідними паролями', async ({ page }) => {
    console.log('📝 Сценарій: Реєстрація з невідповідними паролями');

    const registrationPage = new RegistrationPage(page);
    const timestamp = Date.now();
    const email = `testuser${timestamp}@test.com`;
    const password = 'TestPass123!';
    const passwordRepeat = 'DifferentPass123!';
    const securityQuestionId = 1;
    const securityAnswer = 'Test';

    console.log(`📧 Email: ${email}`);
    console.log('🔑 Паролі не співпадають');

    await registrationPage.goto();
    await page.waitForTimeout(1000);
    await registrationPage.isLoaded();

    // Заповнюємо форму вручну без кліку на кнопку
    await registrationPage.emailInput.fill(email);
    await registrationPage.passwordInput.fill(password);
    await registrationPage.passwordRepeatInput.fill(passwordRepeat);
    await page.locator('div').filter({ hasText: 'Security Question' }).nth(4).click();
    await page.getByRole('option', { name: 'Mother\'s maiden name?' }).click();
    await page.getByRole('textbox', { name: 'Field for the answer to the' }).click();
    await page.getByRole('textbox', { name: 'Field for the answer to the' }).fill(securityAnswer);
    await page.waitForTimeout(500);

    // Перевірка, що кнопка disabled при невідповідних паролях
    const isDisabled = await registrationPage.registerButton.isDisabled();
    expect(isDisabled).toBeTruthy();
    console.log('✅ Кнопка disabled при невідповідних паролях - валідація працює');

    // Перевірка, що реєстрація не відбулася
    const currentUrl = page.url();
    expect(currentUrl).toContain('register');
    console.log('✅ Реєстрація з невідповідними паролями заблокована');
  });

  test('@registration @negative Сценарій Реєстрація з коротким паролем', async ({ page }) => {
    console.log('📝 Сценарій: Реєстрація з коротким паролем');

    const registrationPage = new RegistrationPage(page);
    const timestamp = Date.now();
    const email = `testuser${timestamp}@test.com`;
    const password = '123';
    const passwordRepeat = '123';
    const securityQuestionId = 1;
    const securityAnswer = 'Test';

    console.log(`📧 Email: ${email}`);
    console.log('🔑 Пароль занадто короткий');

    await registrationPage.goto();
    await page.waitForTimeout(1000);
    await registrationPage.isLoaded();

    // Заповнюємо форму вручну без кліку на кнопку
    await registrationPage.emailInput.fill(email);
    await registrationPage.passwordInput.fill(password);
    await registrationPage.passwordRepeatInput.fill(passwordRepeat);
    await page.locator('div').filter({ hasText: 'Security Question' }).nth(4).click();
    await page.getByRole('option', { name: 'Mother\'s maiden name?' }).click();
    await page.getByRole('textbox', { name: 'Field for the answer to the' }).click();
    await page.getByRole('textbox', { name: 'Field for the answer to the' }).fill(securityAnswer);
    await page.waitForTimeout(500);

    // Перевірка, що кнопка disabled при короткому паролі
    const isDisabled = await registrationPage.registerButton.isDisabled();
    expect(isDisabled).toBeTruthy();
    console.log('✅ Кнопка disabled при короткому паролі - валідація працює');

    // Перевірка, що реєстрація не відбулася
    const currentUrl = page.url();
    expect(currentUrl).toContain('register');
    console.log('✅ Реєстрація з коротким паролем заблокована');
  });

  test('@registration @negative Сценарій Реєстрація без email', async ({ page }) => {
    console.log('📝 Сценарій: Реєстрація без email');

    const registrationPage = new RegistrationPage(page);
    const password = 'TestPass123!';
    const passwordRepeat = 'TestPass123!';
    const securityQuestionId = 1;
    const securityAnswer = 'Test';

    console.log('📧 Email відсутній');

    await registrationPage.goto();
    await page.waitForTimeout(1000);
    await registrationPage.isLoaded();

    // Заповнюємо форму вручну без email
    await registrationPage.passwordInput.fill(password);
    await registrationPage.passwordRepeatInput.fill(passwordRepeat);
    await page.locator('div').filter({ hasText: 'Security Question' }).nth(4).click();
    await page.getByRole('option', { name: 'Mother\'s maiden name?' }).click();
    await page.getByRole('textbox', { name: 'Field for the answer to the' }).click();
    await page.getByRole('textbox', { name: 'Field for the answer to the' }).fill(securityAnswer);
    await page.waitForTimeout(500);

    // Перевірка, що кнопка disabled без email
    const isDisabled = await registrationPage.registerButton.isDisabled();
    expect(isDisabled).toBeTruthy();
    console.log('✅ Кнопка disabled без email - валідація працює');

    // Перевірка, що реєстрація не відбулася
    const currentUrl = page.url();
    expect(currentUrl).toContain('register');
    console.log('✅ Реєстрація без email заблокована');
  });

  test('@registration @negative Сценарій Реєстрація з невалідним email', async ({ page }) => {
    console.log('📝 Сценарій: Реєстрація з невалідним email');

    const registrationPage = new RegistrationPage(page);
    const email = 'invalid-email';
    const password = 'TestPass123!';
    const passwordRepeat = 'TestPass123!';
    const securityQuestionId = 1;
    const securityAnswer = 'Test';

    console.log(`📧 Email: ${email} (невалідний формат)`);

    await registrationPage.goto();
    await page.waitForTimeout(1000);
    await registrationPage.isLoaded();

    // Заповнюємо форму вручну з невалідним email
    await registrationPage.emailInput.fill(email);
    await registrationPage.passwordInput.fill(password);
    await registrationPage.passwordRepeatInput.fill(passwordRepeat);
    await page.locator('div').filter({ hasText: 'Security Question' }).nth(4).click();
    await page.getByRole('option', { name: 'Mother\'s maiden name?' }).click();
    await page.getByRole('textbox', { name: 'Field for the answer to the' }).click();
    await page.getByRole('textbox', { name: 'Field for the answer to the' }).fill(securityAnswer);
    await page.waitForTimeout(500);

    // Перевірка, що кнопка disabled при невалідному email
    const isDisabled = await registrationPage.registerButton.isDisabled();
    expect(isDisabled).toBeTruthy();
    console.log('✅ Кнопка disabled при невалідному email - валідація працює');

    // Перевірка, що реєстрація не відбулася
    const currentUrl = page.url();
    expect(currentUrl).toContain('register');
    console.log('✅ Реєстрація з невалідним email заблокована');
  });
});

describe('Registration Тести - Валідація полів', () => {
  test('@registration @validation Сценарій Валідація поля email', async ({ page }) => {
    console.log('📝 Сценарій: Валідація поля email');

    const registrationPage = new RegistrationPage(page);

    await registrationPage.goto();
    await page.waitForTimeout(1000);
    await registrationPage.isLoaded();

    // Перевірка, що поле email видиме та доступне для вводу
    const emailInput = registrationPage.emailInput;
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEnabled();
    console.log('✅ Поле email доступне для вводу');

    // Перевірка placeholder або атрибутів
    const emailType = await emailInput.getAttribute('type');
    expect(emailType).toBe('text');
    console.log('✅ Поле email має правильний тип (text)');
  });

  test('@registration @validation Сценарій Валідація поля password', async ({ page }) => {
    console.log('📝 Сценарій: Валідація поля password');

    const registrationPage = new RegistrationPage(page);

    await registrationPage.goto();
    await page.waitForTimeout(1000);
    await registrationPage.isLoaded();

    // Перевірка, що поле password видиме та доступне для вводу
    const passwordInput = registrationPage.passwordInput;
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toBeEnabled();
    console.log('✅ Поле password доступне для вводу');

    // Перевірка типу поля (password для приховування символів)
    const passwordType = await passwordInput.getAttribute('type');
    expect(passwordType).toBe('password');
    console.log('✅ Поле password має правильний тип (password)');
  });

  test('@registration @validation Сценарій Валідація поля passwordRepeat', async ({ page }) => {
    console.log('📝 Сценарій: Валідація поля passwordRepeat');

    const registrationPage = new RegistrationPage(page);

    await registrationPage.goto();
    await page.waitForTimeout(1000);
    await registrationPage.isLoaded();

    // Перевірка, що поле passwordRepeat видиме та доступне для вводу
    const passwordRepeatInput = registrationPage.passwordRepeatInput;
    await expect(passwordRepeatInput).toBeVisible();
    await expect(passwordRepeatInput).toBeEnabled();
    console.log('✅ Поле passwordRepeat доступне для вводу');

    // Перевірка типу поля
    const passwordRepeatType = await passwordRepeatInput.getAttribute('type');
    expect(passwordRepeatType).toBe('password');
    console.log('✅ Поле passwordRepeat має правильний тип (password)');
  });

  test('@registration @validation Сценарій Валідація поля securityQuestion', async ({ page }) => {
    console.log('📝 Сценарій: Валідація поля securityQuestion');

    const registrationPage = new RegistrationPage(page);

    await registrationPage.goto();
    await page.waitForTimeout(1000);
    await registrationPage.isLoaded();

    // Перевірка, що поле securityQuestion видиме та доступне для вибору
    const securityQuestionSelect = registrationPage.securityQuestionSelect;
    await expect(securityQuestionSelect).toBeVisible();
    await expect(securityQuestionSelect).toBeEnabled();
    console.log('✅ Поле securityQuestion доступне для вибору');

    // Перевірка, що це select елемент (Angular Material mat-select)
    const tagName = await securityQuestionSelect.evaluate(el => el.tagName.toLowerCase());
    expect(tagName).toBe('mat-select');
    console.log('✅ Поле securityQuestion має правильний тип (mat-select)');
  });

  test('@registration @validation Сценарій Валідація поля securityAnswer', async ({ page }) => {
    console.log('📝 Сценарій: Валідація поля securityAnswer');

    const registrationPage = new RegistrationPage(page);

    await registrationPage.goto();
    await page.waitForTimeout(1000);
    await registrationPage.isLoaded();

    // Перевірка, що поле securityAnswer видиме та доступне для вводу
    const securityAnswerInput = registrationPage.securityAnswerInput;
    await expect(securityAnswerInput).toBeVisible();
    await expect(securityAnswerInput).toBeEnabled();
    console.log('✅ Поле securityAnswer доступне для вводу');
  });

  test('@registration @validation Сценарій Валідація кнопки register', async ({ page }) => {
    console.log('📝 Сценарій: Валідація кнопки register');

    const registrationPage = new RegistrationPage(page);

    await registrationPage.goto();
    await page.waitForTimeout(1000);
    await registrationPage.isLoaded();

    // Перевірка, що кнопка register видим
    const registerButton = registrationPage.registerButton;
    await expect(registerButton).toBeVisible();
    console.log('✅ Кнопка register видима');

    // Кнопка може бути disabled на порожній формі - це нормальна валідація
    const isDisabled = await registerButton.isDisabled();
    console.log(`📋 Кнопка стан: ${isDisabled ? 'disabled (порожня форма)' : 'enabled'}`);

    // Перевірка типу елемента (button)
    const buttonType = await registerButton.getAttribute('type');
    expect(buttonType).toBe('submit');
    console.log('✅ Кнопка register має правильний тип (submit)');
  });

  test('@registration @validation Сценарій Перевірка обов\'язкових полів', async ({ page }) => {
    console.log('📝 Сценарій: Перевірка обов\'язкових полів');

    const registrationPage = new RegistrationPage(page);

    await registrationPage.goto();
    await page.waitForTimeout(1000);
    await registrationPage.isLoaded();

    // Перевірка, що кнопка disabled на порожній формі
    const isDisabled = await registrationPage.registerButton.isDisabled();
    expect(isDisabled).toBeTruthy();
    console.log('✅ Кнопка disabled на порожній формі - валідація працює');

    // Спроба клікнути на disabled кнопку не призведе до відправки
    await registrationPage.registerButton.click({ timeout: 1000 }).catch(() => {});
    await page.waitForTimeout(1000);

    // Перевірка, що реєстрація не відбулася
    const currentUrl = page.url();
    expect(currentUrl).toContain('register');
    console.log('✅ Форма не відправлена з пустими полями');
  });
});
