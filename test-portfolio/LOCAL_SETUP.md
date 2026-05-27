# Локальне налаштування та запуск тестів

Цей гайд допоможе вам налаштувати середовище для локального запуску тестів Juice Shop.

## 📋 Вимоги

### Обов'язкові

- **Node.js** версії 18 або вище
- **npm** (входить в Node.js)
- **Git**

### Опціональні

- **Docker** (для запуску Juice Shop в контейнері)
- **VS Code** (рекомендована IDE)

## 🔧 Встановлення Node.js

1. Перейдіть на https://nodejs.org/
2. Завантажте LTS версію (рекомендується Node.js 18+)
3. Встановіть Node.js
4. Перевірте встановлення:

```bash
node --version
npm --version
```

## 🚀 Запуск Juice Shop

### Варіант 1: Docker (Рекомендовано)

```bash
docker run -d -p 3000:3000 bkimminich/juice-shop
```

Перевірте що сервер запущено: http://localhost:3000

### Варіант 2: Локальна установка

```bash
# Клонування репозиторію Juice Shop
git clone https://github.com/juice-shop/juice-shop.git
cd juice-shop

# Встановлення залежностей
npm install

# Запуск сервера
npm start
```

Перевірте що сервер запущено: http://localhost:3000

### Варіант 3: Використання вбудованого Juice Shop

Якщо у вас вже є Juice Shop в `e:\Projects\Juice_Shop\juice-shop\`:

```bash
cd e:\Projects\Juice_Shop\juice-shop
npm install
npm start
```

## 📦 Налаштування API тестів

```bash
# Перейдіть в папку API тестів
cd e:\Projects\Juice_Shop\test-portfolio\api-tests

# Встановлення залежностей
npm install

# Запуск тестів
npm test
```

### Результати API тестів

- Логи зберігаються в `api-tests/logs/`
- JSON формат для легкої інтеграції

## 🎭 Налаштування UI тестів (Playwright)

```bash
# Перейдіть в папку UI тестів
cd e:\Projects\Juice_Shop\test-portfolio\ui-tests2

# Встановлення залежностей
npm install

# Встановлення браузерів Playwright
npx playwright install chromium

# Запуск тестів
npx playwright test
```

### Результати UI тестів

- HTML звіт: `ui-tests2/playwright-report/`
- Результати тестів: `ui-tests2/test-results/`

## 🎬 Запуск конкретних тестів

### Smoke тести

```bash
cd ui-tests2
npx playwright test smoke.spec.js
```

### Regression тести

```bash
cd ui-tests2
npx playwright test reg.spec.js
```

### Запуск з візуалізацією

```bash
# З відкритим браузером
npx playwright test --headed

# З Playwright UI mode
npx playwright test --ui

# З відлагодженням
npx playwright test --debug
```

### Запуск конкретного тесту

```bash
# За назвою
npx playwright test -g "Login user"

# За номером рядка
npx playwright test smoke.spec.js:10
```

## 📊 Перегляд результатів

### Playwright HTML Report

```bash
cd ui-tests2
npx playwright show-report
```

Це відкриє інтерактивний HTML звіт у браузері за адресою http://localhost:9323

### Playwright Trace Viewer

```bash
cd ui-tests2
npx playwright show-trace trace.zip
```

Потрібен файл trace.zip з папки test-results

## 🛠 Налаштування Playwright

Файл конфігурації: `ui-tests2/playwright.config.js`

### Основні налаштування

```javascript
module.exports = {
  testDir: './',
  timeout: 30000, // Тайм-аут тесту (мс)
  retries: 0, // Кількість повторів
  workers: 1, // Паралельні воркери
  reporter: 'html', // Тип звіту
  use: {
    baseURL: 'http://localhost:3000', // URL Juice Shop
    screenshot: 'only-on-failure', // Скріншоти при помилках
    video: 'retain-on-failure', // Відео при помилках
  },
};
```

## 🐛 Вирішення проблем

### Проблема: "Connection refused"

**Рішення:** Переконайтеся що Juice Shop запущений на порту 3000

```bash
# Перевірте порт
curl http://localhost:3000

# Або в PowerShell
Test-NetConnection -ComputerName localhost -Port 3000
```

### Проблема: "Module not found"

**Рішення:** Перевстановіть залежності

```bash
rm -rf node_modules package-lock.json
npm install
```

### Проблема: "Browser not found"

**Рішення:** Встановіть браузери Playwright

```bash
npx playwright install chromium
```

### Проблема: Тести падають з тайм-аутом

**Рішення:** Збільште тайм-аут в playwright.config.js або додайте очікування

```javascript
await page.waitForTimeout(5000);
```

### Проблема: "EADDRINUSE" (порт зайнятий)

**Рішення:** Зупиніть Juice Shop або змініть порт

```bash
# Знайдіть процес на порту 3000
netstat -ano | findstr :3000

# Зупиніть процес
taskkill /PID <PID> /F
```

## 📝 Тестові дані

### Логіни та паролі

Файл: `ui-tests2/testData/credentials.js`

```javascript
module.exports = {
  validUser: {
    email: 'test@juice-sh.op',
    password: 'password123',
  },
  invalidUser: {
    email: 'invalid@test.com',
    password: 'wrongpassword',
  },
};
```

### Зміна тестових даних

Відредагуйте файл `credentials.js` для використання інших логінів/паролів.

## 🔧 Налаштування VS Code

### Рекомендовані розширення

- Playwright Test for VS Code
- ESLint
- Prettier

### Встановлення Playwright extension

1. Відкрийте VS Code
2. Перейдіть в Extensions (Ctrl+Shift+X)
3. Пошукайте "Playwright Test for VS Code"
4. Встановіть розширення від Microsoft

### Запуск тестів з VS Code

- Натисніть на зелену кнопку поруч з тестом
- Або натисніть Ctrl+Shift+P → "Playwright: Run all tests"

## 🚀 Швидкий старт

### Повний цикл налаштування

```bash
# 1. Запуск Juice Shop (Docker)
docker run -d -p 3000:3000 bkimminich/juice-shop

# 2. Налаштування API тестів
cd e:\Projects\Juice_Shop\test-portfolio\api-tests
npm install
npm test

# 3. Налаштування UI тестів
cd e:\Projects\Juice_Shop\test-portfolio\ui-tests2
npm install
npx playwright install chromium
npx playwright test

# 4. Перегляд результатів
npx playwright show-report
```

## 📚 Корисні ресурси

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

**Потребуєте допомогу?** Дивіться [README.md](./README.md) або [CI_CD_GUIDE.txt](./CI_CD_GUIDE.txt)
