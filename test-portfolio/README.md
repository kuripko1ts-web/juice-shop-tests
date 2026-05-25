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
│       └── playwright-tests.yml # Workflow для UI тестів (Playwright)
├── api-tests/               # API тести
│   ├── api-tests.js         # Основний файл з тестами
│   ├── api-tests.test.js    # OWASP Juice Shop API тести
│   ├── security-tests.test.js # OWASP Top 10 Security тести
│   ├── search-tests.test.js  # Product Search API тести
│   ├── negative-tests.test.js # Negative API тести
│   ├── fixtures/            # Тестові дані
│   │   └── users.json       # Користувачі для тестів
│   ├── helpers/             # Helper функції
│   │   └── api-client.js    # API client
│   ├── package.json         # Залежності API тестів
│   └── test-results/        # Результати API тестів
├── ui-tests2/               # UI тести (Playwright)
│   ├── pages/               # Page Object Model
│   │   ├── BasePage.js      # Базова сторінка
│   │   ├── LoginPage.js     # Сторінка логіну
│   │   ├── CartPage.js      # Сторінка кошика
│   │   └── RegistrationPage.js # Сторінка реєстрації
│   ├── testData/            # Тестові дані
│   │   └── credentials.js   # Логіни/паролі
│   ├── utils/               # Утиліти
│   │   └── logger.js        # Логування
│   ├── smoke.spec.js        # Smoke тести
│   ├── reg.spec.js          # Регресійні тести
│   ├── registration.spec.js # Реєстрація тести
│   ├── integrated-user-lifecycle.spec.js # Інтегровані тести
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

**Основні API тести (api-tests.test.js):**
- ✅ Аутентифікація та авторизація
- ✅ CRUD операції з продуктами
- ✅ Кошик покупок
- ✅ Замовлення
- ✅ Отримання інформації про користувача

**OWASP Top 10 Security тести (security-tests.test.js):**
- ✅ A01: Broken Access Control
- ✅ A02: Cryptographic Failures
- ✅ A03: Injection (SQL/NoSQL/XSS)
- ✅ A04: Insecure Design
- ✅ A05: Security Misconfiguration
- ✅ A07: Identification and Authentication Failures
- ✅ A08: Software and Data Integrity Failures
- ✅ A09: Security Logging and Monitoring Failures
- ✅ A10: Server-Side Request Forgery (SSRF)

**Product Search API тести (search-tests.test.js):**
- ✅ Валідні пошукові запити
- ✅ Порожні та null запити
- ✅ Спеціальні символи та Unicode
- ✅ Ін'єкційні атаки (SQL, XSS, NoSQL, Command)
- ✅ Крайові випадки та обмеження довжини

**Negative API тести (negative-tests.test.js):**
- ✅ Невалідні дані реєстрації
- ✅ Невалідні дані логіну
- ✅ Невалідні дані feedback
- ✅ XSS та SQL ін'єкції в полях форм

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

**Registration Тести (registration.spec.js):**
- ✅ Реєстрація з валідними даними
- ✅ Реєстрація з невалідними даними
- ✅ Валідація полів форми (email, password, security question)
- ✅ Перевірка відключення кнопки при невалідних даних
- ✅ XSS та SQL ін'єкції в полях реєстрації

**Інтегровані тести (integrated-user-lifecycle.spec.js):**
- ✅ Створення користувача через API
- ✅ Логін через UI
- ✅ Повний життєвий цикл користувача

**Page Object Model:**
- `BasePage.js` - базові методи для всіх сторінок
- `LoginPage.js` - сторінка аутентифікації
- `CartPage.js` - сторінка кошика покупок
- `RegistrationPage.js` - сторінка реєстрації

## 🛠 Технології

### API Тести
- **Runtime:** Node.js 20+
- **Framework:** Jest
- **HTTP Client:** Axios
- **Reporting:** JSON logs, coverage reports

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

**GitHub Repository:** https://github.com/kuripko1ts-web/juice-shop-tests
