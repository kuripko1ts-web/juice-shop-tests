# Juice Shop Test Portfolio

Портфоліо автоматизованих тестів для OWASP Juice Shop - вразливого веб-додатку для навчання з веб-безпеки.

## 📋 Зміст

- [Структура проекту](#структура-проекту)
- [Тестове середовище](#тестове-середовище)
- [API Тести](#api-тести)
- [UI Тести](#ui-тести)
- [Технології](#технології)
- [Запуск тестів](#запуск-тестів)
- [CI/CD](#cicd)
- [Структура тестів](#структура-тестів)

## 📁 Структура проекту

```
test-portfolio/
├── .github/
│   └── workflows/           # GitHub Actions workflows
│       ├── api-tests.yml    # Workflow для API тестів
│       └── ui-tests.yml     # Workflow для UI тестів
├── api-tests/               # API тести
│   ├── api-tests.js         # Основний файл з тестами
│   ├── package.json         # Залежності API тестів
│   └── test-results/        # Результати API тестів
├── ui-tests2/               # UI тести (Playwright)
│   ├── pages/               # Page Object Model
│   │   ├── BasePage.js      # Базова сторінка
│   │   ├── LoginPage.js     # Сторінка логіну
│   │   └── CartPage.js      # Сторінка кошика
│   ├── testData/            # Тестові дані
│   │   └── credentials.js   # Логіни/паролі
│   ├── utils/               # Утиліти
│   │   └── logger.js        # Логування
│   ├── smoke.spec.js        # Smoke тести
│   ├── reg.spec.js          # Регресійні тести
│   ├── playwright.config.js # Конфігурація Playwright
│   ├── package.json         # Залежності UI тестів
│   ├── playwright-report/   # HTML звіти Playwright
│   └── test-results/        # Результати тестів
├── reports/                 # Звіти тестів
├── CI_CD_GUIDE.txt          # Детальний гайд по CI/CD
├── README.md                # Цей файл
└── run-all.ps1              # Скрипт для запуску всіх тестів
```

## 🌐 Тестове середовище

- **Демо версія:** http://demo.owasp-juice.shop
- **Локальна версія:** localhost:3000 (після налаштування)
- **Docker:** `docker run -d -p 3000:3000 bkimminich/juice-shop`

## 🔍 API Тести

Тестування REST API Juice Shop:

**Критичні функції:**
- ✅ Аутентифікація та авторизація
- ✅ CRUD операції з продуктами
- ✅ Кошик покупок
- ✅ Замовлення
- ✅ Отримання інформації про користувача

**Вразливості API:**
- SQL Injection
- XSS
- Broken Authentication
- Sensitive Data Exposure

## 🎨 UI Тести

Тестування користувацького інтерфейсу з Playwright:

**Smoke Тести (smoke.spec.js):**
- ✅ Логін користувача
- ✅ Перегляд продуктів
- ✅ Додавання товару в кошик
- ✅ Оформлення замовлення
- ✅ Перевірка кошика

**Regression Тести (reg.spec.js):**
- ✅ Реєстрація нового користувача
- ✅ Логін з невірними даними
- ✅ Перевірка One-Day Delivery
- ✅ Перевірка кошика з кількома товарами

**Page Object Model:**
- `BasePage.js` - базові методи для всіх сторінок
- `LoginPage.js` - сторінка аутентифікації
- `CartPage.js` - сторінка кошика покупок

## 🛠 Технології

### API Тести
- **Runtime:** Node.js 18+
- **Framework:** REST API testing
- **Reporting:** JSON logs

### UI Тести
- **Runtime:** Node.js 18+
- **Framework:** Playwright
- **Browsers:** Chromium (default)
- **Reporting:** HTML reports (Playwright Reporter)
- **Pattern:** Page Object Model (POM)

### CI/CD
- **Platform:** GitHub Actions
- **OS:** Ubuntu Latest
- **Docker:** Juice Shop container
- **Artifacts:** Test reports (30 days retention)

## 🚀 Запуск тестів

### Локальний запуск

#### API Тести
```bash
cd api-tests
npm install
npm test
```

#### UI Тести
```bash
cd ui-tests2
npm install
npx playwright install chromium
npx playwright test
```

#### Запуск конкретних тестів
```bash
# Smoke тести
npx playwright test smoke.spec.js

# Regression тести
npx playwright test reg.spec.js

# З заголовком
npx playwright test --headed

# З UI режимом
npx playwright test --ui
```

#### Запуск всіх тестів (PowerShell)
```powershell
.\run-all.ps1
```

### Перегляд результатів

#### Playwright HTML Report
```bash
cd ui-tests2
npx playwright show-report
```

#### Playwright Test Results
```bash
cd ui-tests2
npx playwright show-trace trace.zip
```

## 🔄 CI/CD

### GitHub Actions

**Автоматичний запуск:**
- Push в гілки: `main`, `master`, `develop`
- Pull Request в гілки: `main`, `master`, `develop`

**Ручний запуск:**
1. GitHub → Actions tab
2. Виберіть workflow (UI Tests або API Tests)
3. Run workflow → Виберіть гілку → Run workflow

**Перегляд результатів:**
- GitHub → Actions tab → Workflow run
- Завантаження artifacts (звіти тестів)

**Детальна документація:** Дивіться [CI_CD_GUIDE.txt](./CI_CD_GUIDE.txt)

## 📊 Структура тестів

### Smoke Тести
Критичні тези для перевірки основного функціоналу:
- Логін
- Перегляд продуктів
- Додавання в кошик
- Оформлення замовлення

### Regression Тести
Повні тести для перевірки всього функціоналу:
- Реєстрація
- Валідація форм
- Перевірка різних сценаріїв
- Обробка помилок

## 🎯 OWASP Juice Shop

OWASP Juice Shop - найсучасніше вразливе веб-додаток для:
- 🎓 Навчання з веб-безпеки
- 🛡 Тренінгів з пентестингу
- 🏆 CTF змагань
- 🔧 Тестування інструментів безпеки

**Містить вразливості:**
- OWASP Top Ten
- SQL Injection
- XSS
- CSRF
- Broken Authentication
- І багато інших...

## 👤 Автор

Тестове портфоліо для демонстрації навичок автоматизованого тестування.

---

**GitHub Repository:** https://github.com/kuripko1ts-web/juice-shop_test_portfolio
