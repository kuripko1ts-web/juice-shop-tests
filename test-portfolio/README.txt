╔══════════════════════════════════════════════════════════════════════════════╗
║                    OWASP JUICE SHOP TEST PORTFOLIO                              ║
║                        Детальний опис структури проекту                          ║
║                                                                              ОСТАННЄ ОНОВЛЕННЯ: 23.05.2026 ║
╚══════════════════════════════════════════════════════════════════════════════╝

================================================================================
1. ОГЛЯД ПРОЕКТУ
================================================================================

Цей проект є портфоліо автоматизованого тестування для OWASP Juice Shop -
вразливого веб-додатку для навчання з безпеки.

Мета проекту:
- Демонстрація навичок автоматизації тестування
- Інтеграція API та UI тестування
- Використання сучасних патернів (Page Object Model)
- Централізована логіровка даних

================================================================================
2. СТРУКТУРА ПРОЕКТУ
================================================================================

E:\Projects\Juice_Shop\
├── juice-shop/                    (Вихідний код OWASP Juice Shop)
│   ├── package.json               (Залежності та скрипти Juice Shop)
│   ├── node_modules/              (Встановлені пакети npm)
│   ├── build/                     (Скомпільований код)
│   ├── frontend/                  (Frontend частина)
│   ├── routes/                    (API endpoints TypeScript)
│   └── ...                        (Інші файли Juice Shop)
│
└── test-portfolio/                (Портфоліо тестів - ТВОЯ РОБОТА)
    ├── README.txt                 (Цей файл - опис структури)
    ├── package.json               (Скрипти для запуску всіх тестів)
    ├── package-lock.json          (Фіксація версій залежностей)
    │
    ├── api-tests/                 (API тести з axios)
    │   ├── package.json           (Залежності для API тестів)
    │   ├── package-lock.json      (Фіксація версій)
    │   └── api-tests.js           (Файл з API тестами)
    │
    ├── ui-tests/                  (UI тести з Playwright)
    │   ├── package.json           (Залежності для UI тестів)
    │   ├── package-lock.json      (Фіксація версій)
    │   ├── playwright.config.js   (Конфігурація Playwright)
    │   ├── ui-tests.spec.js       (Базові UI тести)
    │   ├── integrated-login.spec.js (Інтегрований тест API + UI)
    │   ├── smoke.spec.js          (Smoke тести - критична функціональність)
    │   ├── reg.spec.js            (Регресійні тести - варіанти доставки та оплати)
    │   │
    │   ├── pages/                 (Page Objects - POM патерн)
    │   │   ├── BasePage.js        (Базовий клас для всіх сторінок)
    │   │   ├── LoginPage.js       (Page Object для сторінки логіну)
    │   │   └── CartPage.js        (Page Object для кошика та checkout)
    │   │
    │   ├── testData/              (Тестові дані)
    │   │   └── credentials.js     (Креденшали для тестів)
    │   │
    │   ├── utils/                 (Утиліти)
    │   │   └── logger.js          (Логіровка даних в файл)
    │   │
    │   └── logs/                  (Лог файли - створюються автоматично)
    │       ├── user-credentials.json (Збережені креденшали)
    │       └── test-results.json     (Результати тестів)
    │
    └── run-all.ps1                (PowerShell скрипт для автоматизації)

================================================================================
3. ОПИС ПАПОК ТА ЇХ ПРИЗНАЧЕННЯ
================================================================================

3.1. juice-shop/
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Вихідний код OWASP Juice Shop - вразливого веб-додатку для тестування

ЩО МІСТИТЬ:
- package.json: Залежності та скрипти для запуску Juice Shop
- node_modules/: Встановлені npm пакети
- build/: Скомпільований код сервера
- frontend/: Frontend частина (Angular)
- routes/: API endpoints (TypeScript файли)

ЯК ВИКОРИСТОВУВАТИ:
Запуск сервера: npm start (з папки juice-shop)
Порт: 3000 (http://localhost:3000)

3.2. test-portfolio/
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Головна папка портфоліо тестів - твоя робота для демонстрації навичок

ЩО МІСТИТЬ:
- README.txt: Цей файл з детальним описом проекту
- package.json: Скрипти для запуску всіх тестів
- run-all.ps1: Автоматизований скрипт для запуску сервера та тестів

ЯК ВИКОРИСТОВУВАТИ:
Запуск API тестів: npm run test:api
Запуск UI тестів: npm run test:ui
Запуск всіх тестів: npm run test:all
Запуск всього автоматично: npm run run:all

3.3. test-portfolio/api-tests/
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
API тести для тестування REST API Juice Shop з використанням бібліотеки axios

ЩО МІСТИТЬ:
- package.json: Залежності (axios)
- api-tests.js: Клас JuiceShopAPITests з 5 тестами

Тести в api-tests.js:
1. testGetProducts() - Отримання списку продуктів (GET /api/Products)
2. testRegisterUser() - Реєстрація нового користувача (POST /api/Users)
3. testLogin() - Логін користувача (POST /rest/user/login)
4. testGetBasket() - Отримання кошика (GET /api/BasketItems)
5. testGetUserInfo() - Отримання інформації про користувача (GET /rest/user/whoami)

ЯК ВИКОРИСТОВУВАТИ:
Запуск: npm test (з папки api-tests)
Або: cd e:/Projects/Juice_Shop/test-portfolio && npm run test:api

РЕЗУЛЬТАТИ:
4/5 тестів пройдено (стабільно)
1 тест провалено (GetBasket - вимагає аутентифікації)

3.4. test-portfolio/ui-tests/
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
UI тести для тестування веб-інтерфейсу Juice Shop з використанням Playwright

ЩО МІСТИТЬ:
- package.json: Залежності (playwright, axios для інтегрованих тестів)
- playwright.config.js: Конфігурація Playwright (baseURL, браузери)
- ui-tests.spec.js: 10 базових UI тестів
- integrated-login.spec.js: Інтегрований тест API + UI логін
- smoke.spec.js: Smoke тести для критичної функціональності
- reg.spec.js: Регресійні тести для варіантів доставки та оплати
- pages/: Page Objects (POM патерн)
- testData/: Тестові дані
- utils/: Утиліти (логіровка)
- logs/: Лог файли (створюються автоматично)

Тести в ui-tests.spec.js:
1. Перевірка заголовка сторінки
2. Перевірка наявності меню навігації
3. Перевірка наявності кнопки логіну
4. @smoke Перехід на сторінку логіну
5. @smoke Перевірка форми логіну
6. Перевірка наявності продуктів на головній сторінці
7. Перевірка кошика
8. Перевірка пошуку
9. Перевірка сторінки About
10. Перевірка відгуку на мобільний розмір
11. @smoke Логін та розлогування з Page Object

Тести в smoke.spec.js:
1. @smoke @auth Логін валідного користувача
2. @smoke @auth @negative Логін заблокованого користувача
3. @smoke @auth @negative Логін з неправильним паролем
4. @smoke @cart Додавання першого товару в кошик
5. @smoke @cart Видалення всіх товарів з кошика
6. @smoke @checkout Checkout happy path (1 item, One Day Delivery)
7. @smoke @auth @logount Розлогіровка користувача

Тести в reg.spec.js:
1. @reg @checkout @pay2 Checkout з другим методом оплати (карта ************8108)
2. @reg @checkout @delivery1 Checkout з One Day Delivery
3. @reg @checkout @delivery2 Checkout з Fast Delivery
4. @reg @checkout @delivery3 Checkout з Standard Delivery

Теги:
- @smoke: Критичні тести для швидкої перевірки основного функціоналу
- @reg: Регресійні тести для перевірки варіантів доставки та оплати
- @checkout: Тести для checkout процесу
- @auth: Тести аутентифікації
- @cart: Тести кошика
- @negative: Негативні тести

ЯК ВИКОРИСТОВУВАТИ:
Запуск smoke тестів: npx playwright test smoke.spec.js (з папки ui-tests)
Запуск регрес тестів: npx playwright test reg.spec.js (з папки ui-tests)
Запуск всіх UI тестів: npx playwright test (з папки ui-tests)
Або: cd e:/Projects/Juice_Shop/test-portfolio && npm run test:ui
Перегляд звіту: npx playwright show-report

РЕЗУЛЬТАТИ:
- ui-tests.spec.js: 11/11 пройдено
- smoke.spec.js: 7/7 пройдено (1 skipped)
- reg.spec.js: 4/4 пройдено
- Всього UI тестів: 22/22 пройдено

3.5. test-portfolio/ui-tests/pages/
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Page Objects - реалізація Page Object Model (POM) патерну для UI тестів

ЩО МІСТИТЬ:
- BasePage.js: Базовий клас для всіх Page Objects
  - goto(path): Метод для переходу на сторінку
  - waitForLoad(): Очікування завантаження сторінки
  - getTitle(): Отримання заголовка сторінки

- LoginPage.js: Page Object для сторінки логіну
  - goto(): Перехід на сторінку логіну (/#/login)
  - login(email, password): Логін з креденшалами
  - isLoaded(): Перевірка чи сторінка завантажилась
  - logout(): Розлогування користувача

- CartPage.js: Page Object для кошика та checkout
  - goto(): Перехід на сторінку товарів (/#/search)
  - getFirstProductName(): Отримання назви першого товару
  - addFirstItemToCart(): Додавання першого товару в кошик
  - addSecondItemToCart(): Додавання другого товару в кошик
  - goToBasket(): Перехід в кошик
  - verifyOnBasketPage(): Перевірка що ми на сторінці кошика
  - getCartItemCount(): Отримання кількості товарів в кошику
  - verifyCartNotEmpty(): Перевірка що кошик не порожній
  - verifyProductInCart(productName): Перевірка що товар в кошику
  - clearCart(): Видалення всіх товарів з кошика
  - verifyCartEmpty(): Перевірка що кошик порожній
  - checkout(): Checkout з One Day Delivery (за замовчуванням)
  - checkoutWithOneDayDelivery(): Checkout з One Day Delivery
  - checkoutWithFastDelivery(): Checkout з Fast Delivery
  - checkoutWithStandardDelivery(): Checkout з Standard Delivery
  - checkoutWithSecondPayment(): Checkout з другим методом оплати

ЯК ВИКОРИСТОВУВАТИ:
В тестах:
const LoginPage = require('./pages/LoginPage');
const CartPage = require('./pages/CartPage');
const loginPage = new LoginPage(page);
const cartPage = new CartPage(page);
await loginPage.goto();
await loginPage.login(email, password);
await cartPage.goto();
await cartPage.addFirstItemToCart();
await cartPage.checkout();

ПЕРЕВАГИ POM:
- Централізація селекторів
- Повторне використання коду
- Легке підтримання
- Чистий код тестів

3.6. test-portfolio/ui-tests/testData/
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Централізоване управління тестовими даними (креденшали)

ЩО МІСТИТЬ:
- credentials.js: Тестові дані для логіну та реєстрації

Функції в credentials.js:
- admin: Стандартні креденшали адміна (admin@juice-sh.op / admin123)
- generateUserCredentials(): Генерація унікальних креденшалів
- getApiUserCredentials(): Креденшали для API створення користувача

ЯК ВИКОРИСТОВУВАТИ:
В тестах:
const credentials = require('./testData/credentials');
const userData = credentials.getApiUserCredentials();
const admin = credentials.admin;

ПЕРЕВАГИ:
- Централізація даних
- Легке зміна креденшалів
- Генерація унікальних даних
- Безпека (креденшали не в коді тестів)

3.7. test-portfolio/ui-tests/utils/
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Утиліти для допоміжних функцій (логіровка)

ЩО МІСТИТЬ:
- logger.js: Клас для логіровки даних в файл

Методи в logger.js:
- logUserCredentials(userData, filename): Запис креденшалів в файл
- logTestResult(testName, result, filename): Запис результатів тесту
- readUserCredentials(filename): Читання креденшалів з файлу

ЯК ВИКОРИСТОВУВАТИ:
В тестах:
const Logger = require('./utils/logger');
const logger = new Logger('./logs');
logger.logUserCredentials(userData);
logger.logTestResult('Test Name', { status: 'PASS' });

ПЕРЕВАГИ:
- Збереження даних між запусками
- Історія результатів тестів
- Відстеження створених користувачів
- Аудит тестових даних

3.8. test-portfolio/ui-tests/logs/
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Папка для лог файлів (створюється автоматично)

ЩО МІСТИТЬ:
- user-credentials.json: Збережені креденшали користувачів
- test-results.json: Результати тестів

ЯК ВИКОРИСТОВУВАТИ:
Автоматично створюється класом Logger
Можна вручну переглядати для аудиту

================================================================================
4. ОПИС ГОЛОВНИХ ФАЙЛІВ
================================================================================

4.1. test-portfolio/api-tests/api-tests.js
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Файл з API тестами для OWASP Juice Shop

КЛАС: JuiceShopAPITests
МЕТОДИ:
- testGetProducts(): Отримання списку продуктів
- testRegisterUser(): Реєстрація нового користувача
- testLogin(): Логін користувача
- testGetBasket(): Отримання кошика
- testGetUserInfo(): Отримання інформації про користувача
- runAllTests(): Запуск всіх тестів з підсумком

БІБЛІОТЕКА: axios (HTTP клієнт)
BASE_URL: http://localhost:3000

РЕЗУЛЬТАТИ: 4/5 пройдено

4.2. test-portfolio/ui-tests/ui-tests.spec.js
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Базові UI тести для OWASP Juice Shop

ТЕСТИ: 10 тестів для перевірки основного функціоналу
БІБЛІОТЕКА: Playwright (UI автоматизація)
BASE_URL: http://localhost:3000

РЕЗУЛЬТАТИ: 10/10 пройдено

4.3. test-portfolio/ui-tests/integrated-login.spec.js
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Інтегрований тест: створення користувача через API + логін через UI

ТЕСТИ:
1. @smoke Створення користувача через API та логін через UI
2. @smoke Логін з існуючими креденшалами з файлу

ФУНКЦІОНАЛЬНІСТЬ:
1. Створення користувача через API (axios)
2. Логін через UI з створеними креденшалами (Playwright + POM)
3. Запис результатів в лог файл (Logger)
4. Вивід креденшалів на екран (email, пароль, ID)

БІБЛІОТЕКИ: axios, Playwright, POM, Logger
РЕЗУЛЬТАТИ: 2/2 пройдено (обидва з тегом @smoke)

4.4. test-portfolio/ui-tests/playwright.config.js
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Конфігурація Playwright для UI тестів

НАЛАШТУВАННЯ:
- testDir: './' (папка з тестами)
- fullyParallel: true (паралельний запуск)
- retries: 0 (без повторів)
- reporter: 'html' (HTML звіт)
- baseURL: 'http://localhost:3000' (URL Juice Shop)
- use: (налаштування браузера Chromium)

4.5. test-portfolio/ui-tests/pages/BasePage.js
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Базовий клас для всіх Page Objects (POM патерн)

МЕТОДИ:
- goto(path): Перехід на сторінку
- waitForLoad(): Очікування завантаження
- getTitle(): Отримання заголовка

ВЛАСТИВОСТІ:
- page: Playwright page об'єкт
- baseUrl: http://localhost:3000

4.6. test-portfolio/ui-tests/pages/LoginPage.js
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Page Object для сторінки логіну (наслідується від BasePage)

МЕТОДИ:
- goto(): Перехід на /#/login
- login(email, password): Логін з креденшалами
- isLoaded(): Перевірка завантаження сторінки
- logout(): Розлогування через меню користувача

СЕЛЕКТОРИ:
- emailInput: Поле email
- passwordInput: Поле password
- submitButton: Кнопка логіну

4.7. test-portfolio/ui-tests/pages/CartPage.js
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Page Object для сторінки кошика та checkout (наслідується від BasePage)

МЕТОДИ:
- goto(): Перехід на сторінку товарів (/#/search)
- getFirstProductName(): Отримання назви першого товару
- addFirstItemToCart(): Додавання першого товару в кошик
- addSecondItemToCart(): Додавання другого товару в кошик
- goToBasket(): Перехід в кошик
- verifyOnBasketPage(): Перевірка що ми на сторінці кошика
- getCartItemCount(): Отримання кількості товарів в кошику
- verifyCartNotEmpty(): Перевірка що кошик не порожній
- verifyProductInCart(productName): Перевірка що товар в кошику
- clearCart(): Видалення всіх товарів з кошика
- verifyCartEmpty(): Перевірка що кошик порожній
- checkout(): Checkout з One Day Delivery
- checkoutWithOneDayDelivery(): Checkout з One Day Delivery
- checkoutWithFastDelivery(): Checkout з Fast Delivery
- checkoutWithStandardDelivery(): Checkout з Standard Delivery
- checkoutWithSecondPayment(): Checkout з другим методом оплати (карта ************8108)

СЕЛЕКТОРИ:
- firstProductCard: Перший товар на сторінці
- secondProductCard: Другий товар
- addToBasketButton: Кнопка "Add to Basket"
- basketButton: Кнопка кошика
- cartItems: Елементи кошика

4.8. test-portfolio/ui-tests/testData/credentials.js
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Тестові дані для логіну та реєстрації

ДАНІ:
- admin: Стандартні креденшали адміна
- generateUserCredentials(): Генератор унікальних креденшалів
- getApiUserCredentials(): Креденшали для API

4.9. test-portfolio/ui-tests/utils/logger.js
────────────────────────────────────────────────────────────────────────────
ПРИЗНАЧЕННЯ:
Клас для логіровки даних в файл

МЕТОДИ:
- logUserCredentials(userData, filename): Запис креденшалів
- logTestResult(testName, result, filename): Запис результатів
- readUserCredentials(filename): Читання креденшалів

================================================================================
5. ЯК ЗАПУСТИТИ ТЕСТИ
================================================================================

5.1. Запуск сервера Juice Shop
────────────────────────────────────────────────────────────────────────────
Варіант 1: З папки juice-shop
cd e:/Projects/Juice_Shop/juice-shop
npm start

Варіант 2: З папки test-portfolio (npm script)
cd e:/Projects/Juice_Shop/test-portfolio
npm run start:server

Варіант 3: Автоматично (PowerShell скрипт)
cd e:/Projects/Juice_Shop/test-portfolio
npm run run:all

5.2. Запуск API тестів
────────────────────────────────────────────────────────────────────────────
Варіант 1: З папки api-tests
cd e:/Projects/Juice_Shop/test-portfolio/api-tests
npm test

Варіант 2: З папки test-portfolio (npm script)
cd e:/Projects/Juice_Shop/test-portfolio
npm run test:api

5.3. Запуск UI тестів
────────────────────────────────────────────────────────────────────────────
Варіант 1: З папки ui-tests (всі тести)
cd e:/Projects/Juice_Shop/test-portfolio/ui-tests
npx playwright test

Варіант 2: Smoke тести тільки
cd e:/Projects/Juice_Shop/test-portfolio/ui-tests
npx playwright test smoke.spec.js

Варіант 3: Регресійні тести тільки
cd e:/Projects_Juice_Shop/test-portfolio/ui-tests
npx playwright test reg.spec.js

Варіант 4: З папки test-portfolio (npm script)
cd e:/Projects/Juice_Shop/test-portfolio
npm run test:ui

Варіант 5: В headed режимі (з видимим браузером)
cd e:/Projects_Juice_Shop/test-portfolio/ui-tests
npx playwright test --headed

5.4. Запуск інтегрованих тестів
────────────────────────────────────────────────────────────────────────────
cd e:/Projects_Juice_Shop/test-portfolio/ui-tests
npx playwright test integrated-login.spec.js

5.5. Запуск @smoke тестів (критичні тести логування та розлогування)
────────────────────────────────────────────────────────────────────────────
cd e:/Projects_Juice_Shop/test-portfolio/ui-tests
npx playwright test --grep "@smoke"

5.6. Перегляд звітів
────────────────────────────────────────────────────────────────────────────
UI тести звіт:
cd e:/Projects_Juice_Shop/test-portfolio/ui-tests
npx playwright show-report

Лог файли:
e:/Projects_Juice_Shop/test-portfolio/ui-tests/logs/

================================================================================
6. ТЕХНОЛОГІЇ ТА БІБЛІОТЕКИ
================================================================================

6.1. API тестування
────────────────────────────────────────────────────────────────────────────
- axios: HTTP клієнт для виконання API запитів
- Node.js: Runtime для виконання JavaScript

6.2. UI тестування
────────────────────────────────────────────────────────────────────────────
- Playwright: Фреймворк для UI автоматизації
- Chromium: Браузер для тестування

6.3. Патерни та практики
────────────────────────────────────────────────────────────────────────────
- Page Object Model (POM): Патерн для організації UI тестів
- Інтеграція API + UI: Комбінація різних рівнів тестування
- Логіровка: Збереження даних та результатів в файли

================================================================================
7. РЕЗУЛЬТАТИ ТЕСТІВ
================================================================================

7.1. API тести (api-tests.js)
────────────────────────────────────────────────────────────────────────────
Всього: 5 тестів
Пройдено: 4/5 (80%)
Провалено: 1/5 (20%)

Деталі:
✅ GetProducts - Отримання списку продуктів
✅ RegisterUser - Реєстрація нового користувача
✅ Login - Логін користувача
❌ GetBasket - Отримання кошика (вимагає аутентифікації)
✅ GetUserInfo - Отримання інформації про користувача

7.2. UI тести (ui-tests.spec.js)
────────────────────────────────────────────────────────────────────────────
Всього: 11 тестів
Пройдено: 11/11 (100%)
Провалено: 0/11 (0%)

@smoke тести: 5/5 пройдено

Деталі:
✅ Перевірка заголовка сторінки
✅ Перевірка наявності меню навігації
✅ Перевірка наявності кнопки логіну
✅ @smoke Перехід на сторінку логіну
✅ @smoke Перевірка форми логіну
✅ Перевірка наявності продуктів
✅ Перевірка кошика
✅ Перевірка пошуку
✅ Перевірка сторінки About
✅ Перевірка відгуку на мобільний розмір
✅ @smoke Логін та розлогування з Page Object

7.3. Smoke тести (smoke.spec.js)
────────────────────────────────────────────────────────────────────────────
Всього: 7 тестів (1 skipped)
Пройдено: 7/7 (100%)
Пропущено: 1/8

Теги:
- @smoke: 7/7 пройдено
- @auth: 4/4 пройдено
- @cart: 2/2 пройдено
- @checkout: 1/1 пройдено
- @negative: 2/2 пройдено

Деталі:
✅ @smoke @auth Логін валідного користувача
✅ @smoke @auth @negative Логін заблокованого користувача
✅ @smoke @auth @negative Логін з неправильним паролем
✅ @smoke @cart Додавання першого товару в кошик
⏭️ Сценарій Видалення товару (skipped)
✅ @smoke @cart Видалення всіх товарів з кошика
✅ @smoke @checkout Checkout happy path (1 item, One Day Delivery)
✅ @smoke @auth @logount Розлогіровка користувача

7.4. Регресійні тести (reg.spec.js)
────────────────────────────────────────────────────────────────────────────
Всього: 4 тестів
Пройдено: 4/4 (100%)
Провалено: 0/4 (0%)

Теги:
- @reg: 4/4 пройдено
- @checkout: 4/4 пройдено

Деталі:
✅ @reg @checkout @pay2 Checkout з другим методом оплати (карта ************8108)
✅ @reg @checkout @delivery1 Checkout з One Day Delivery
✅ @reg @checkout @delivery2 Checkout з Fast Delivery
✅ @reg @checkout @delivery3 Checkout з Standard Delivery

Особливості:
- Перевіряються різні методи доставки (One Day, Fast, Standard)
- Перевіряється другий метод оплати (карта ************8108)
- Всі тести використовують POM патерн

7.5. Інтегровані тести (integrated-login.spec.js)
────────────────────────────────────────────────────────────────────────────
Всього: 2 тести
Пройдено: 2/2 (100%)
Провалено: 0/2 (0%)

@smoke тести: 2/2 пройдено (обидва тести з тегом @smoke)

Деталі:
✅ @smoke Створення користувача через API + UI логін
✅ @smoke Логін з існуючими креденшалами з файлу

Особливості:
- Вивід креденшалів на екран (email, пароль, ID)
- Запис результатів в лог файл

================================================================================
8. ІСТОРІЯ ЗМІН
================================================================================

23.05.2026:
- Створено smoke.spec.js з smoke тестами для критичної функціональності
- Створено reg.spec.js з регресійними тестами для варіантів доставки та оплати
- Додано CartPage.js Page Object з методами для кошика та checkout
- Реалізовано методи checkout для різних варіантів доставки (One Day, Fast, Standard)
- Реалізовано метод checkoutWithSecondPayment для другого методу оплати
- Додано тести для логіну (валідний, заблокований, неправильний пароль)
- Додано тести для кошика (додавання, видалення)
- Додано тест для checkout happy path
- Додано тест для розлогіровки
- Оновлено README.txt з новими файлами та тестами
- Всього UI тестів: 22/22 пройдено (11 ui-tests + 7 smoke + 4 reg)

21.05.2026 (вечір):
- Додано метод logout() в LoginPage.js для розлогування через URL
- Додано теги @smoke для критичних тестів логування та розлогування
- Додано вивід креденшалів (email, пароль, ID) в інтегрований тест
- Додано новий тест "Логін та розлогування з Page Object" в ui-tests.spec.js
- Додано інструкцію для запуску @smoke тестів (--grep "@smoke")
- Оновлено результати тестів (UI: 11/11, @smoke: 5/5)

21.05.2026 (день):
- Створено детальний README.txt з описом структури проекту
- Додано опис всіх папок та файлів
- Додано інструкції для запуску тестів
- Додано опис технологій та результатів тестів

Попередні зміни (згідно з чекпоінтами):
- Створено структуру портфоліо тестів
- Реалізовано API тести з axios
- Реалізовано UI тести з Playwright
- Виправлено селектори в UI тестах
- Створено POM структуру (BasePage, LoginPage)
- Створено інтегровані тести (API + UI)
- Реалізовано логіровку в окремий файл
- Створено файл для тестових даних

================================================================================
9. ПОРЯДОК ОНОВЛЕННЯ README.txt
================================================================================

При кожній зміні файлів проекту оновлювати цей файл:

1. Додати опис нового файлу в розділ "ОПИС ГОЛОВНИХ ФАЙЛІВ"
2. Оновити опис папки в розділі "ОПИС ПАПОК ТА ЇХ ПРИЗНАЧЕННЯ"
3. Додати нові інструкції запуску в розділ "ЯК ЗАПУСТИТИ ТЕСТИ"
4. Оновити результати тестів в розділі "РЕЗУЛЬТАТИ ТЕСТІВ"
5. Додати запис в розділ "ІСТОРІЯ ЗМІН" з датою та описом

================================================================================
10. КОНТАКТА ТА РЕСУРСИ
================================================================================

OWASP Juice Shop:
- Документація: https://owasp.org/www-project-juice-shop/
- GitHub: https://github.com/juice-shop/juice-shop
- API: https://pwning.owasp-juice.shop/companion-guide/latest/part2/api.html

Технології:
- Node.js: https://nodejs.org/
- npm: https://www.npmjs.com/
- axios: https://axios-http.com/
- Playwright: https://playwright.dev/

================================================================================
КІНЕЦЬ ДОКУМЕНТАЦІЇ
================================================================================
