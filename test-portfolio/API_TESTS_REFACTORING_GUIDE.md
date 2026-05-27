# Детальний гайд: Переписування API тестів з Jest

## 📋 Загальний план

Цей гайд покроково описує як переписати існуючі API тести з використанням Jest фреймворку та додати proper assertions.

---

## 🔧 КРОК 1: Встановлення Jest та залежностей

### Що робити:

Встановити Jest та необхідні пакети для API тестування.

### Як це зробити:

```bash
cd e:\Projects\Juice_Shop\test-portfolio\api-tests

# Встановлення Jest
npm install --save-dev jest

# Встановлення axios (якщо ще не встановлено)
npm install axios

# Встановлення додаткових інструментів
npm install --save-dev @types/jest supertest jest-environment-node

# Опціонально: для кращих assertions
npm install --save-dev jest-extended
```

### Чому це потрібно:

- **Jest** - потужний тестовий фреймворк від Facebook
- **axios** - HTTP клієнт для API запитів
- **supertest** - для тестування HTTP endpoints (опціонально)
- **jest-environment-node** - середовище для Node.js тестів
- **jest-extended** - додаткові matchers для assertions

---

## 📁 КРОК 2: Створення структури папок

### Що робити:

Створити правильну структуру папок для організації тестів.

### Як це зробити:

```bash
cd e:\Projects\Juice_Shop\test-portfolio\api-tests

# Створення структури папок
mkdir tests
mkdir tests\auth
mkdir tests\products
mkdir tests\basket
mkdir tests\orders
mkdir fixtures
mkdir helpers
```

### Результат:

```
api-tests/
├── tests/
│   ├── auth/
│   │   ├── login.spec.js
│   │   ├── register.spec.js
│   │   └── logout.spec.js
│   ├── products/
│   │   ├── get-products.spec.js
│   │   └── get-product-by-id.spec.js
│   ├── basket/
│   │   ├── get-basket.spec.js
│   │   └── add-item.spec.js
│   └── orders/
│       └── create-order.spec.js
├── fixtures/
│   ├── users.json
│   ├── products.json
│   └── orders.json
├── helpers/
│   ├── api-client.js
│   └── auth-helper.js
├── jest.config.js
├── package.json
└── README.md
```

### Чому це потрібно:

- **Організація** - тести розділені за функціональністю
- **Масштабованість** - легко додавати нові тести
- **Читабельність** - зрозуміла структура проекту

---

## 📄 КРОК 3: Створення fixtures (тестових даних)

### Що робити:

Створити файли з тестовими даними для використання в тестах.

### Як це зробити:

#### Створити `fixtures/users.json`:

```json
{
  "validAdmin": {
    "email": "admin@juice-sh.op",
    "password": "admin123"
  },
  "validUser": {
    "email": "test@juice-sh.op",
    "password": "password123"
  },
  "newUser": {
    "email": "newuser{{timestamp}}@test.com",
    "password": "NewUser123!",
    "passwordRepeat": "NewUser123!",
    "securityQuestion": {
      "id": 1,
      "answer": "Test"
    }
  },
  "invalidUser": {
    "email": "invalid@test.com",
    "password": "wrongpassword"
  },
  "lockedUser": {
    "email": "locked_out@juice-sh.op",
    "password": "locked_out123"
  }
}
```

#### Створити `fixtures/products.json`:

```json
{
  "validProduct": {
    "name": "Apple Juice",
    "description": "Fresh apple juice",
    "price": 1.99,
    "image": "apple-juice.jpg"
  },
  "invalidProduct": {
    "name": "",
    "description": "",
    "price": -1
  }
}
```

### Чому це потрібно:

- **Reusability** - тестові дані використовуються в багатьох тестах
- **Maintainability** - легко змінювати тестові дані
- **Separation** - дані відокремлені від логіки тестів

---

## 🔧 КРОК 4: Створення API Client helper

### Що робити:

Створити helper клас для роботи з API.

### Як це зробити:

#### Створити `helpers/api-client.js`:

```javascript
const axios = require('axios');

class ApiClient {
  constructor(baseURL = 'http://localhost:3000') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
  }

  setAuthToken(token) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  clearAuthToken() {
    delete this.client.defaults.headers.common['Authorization'];
  }

  // Auth endpoints
  async login(email, password) {
    return this.client.post('/rest/user/login', { email, password });
  }

  async register(userData) {
    return this.client.post('/api/Users', userData);
  }

  // Product endpoints
  async getProducts() {
    return this.client.get('/api/Products');
  }

  async getProductById(id) {
    return this.client.get(`/api/Products/${id}`);
  }

  // Basket endpoints
  async getBasket() {
    return this.client.get('/api/BasketItems');
  }

  async addToBasket(basketItem) {
    return this.client.post('/api/BasketItems', basketItem);
  }

  async removeFromBasket(id) {
    return this.client.delete(`/api/BasketItems/${id}`);
  }

  // Order endpoints
  async getOrders() {
    return this.client.get('/api/Orders');
  }

  async createOrder(orderData) {
    return this.client.post('/api/Orders', orderData);
  }

  // User endpoints
  async getUserInfo() {
    return this.client.get('/rest/user/whoami');
  }
}

module.exports = ApiClient;
```

### Чому це потрібно:

- **Encapsulation** - вся логіка HTTP запитів в одному місці
- **Reusability** - використовується в усіх тестах
- **Maintainability** - легко змінювати базову URL, заголовки тощо
- **Auth management** - централізоване управління токенами

---

## 🔐 КРОК 5: Створення Auth Helper

### Що робити:

Створити helper для аутентифікації та управління токенами.

### Як це зробити:

#### Створити `helpers/auth-helper.js`:

```javascript
const ApiClient = require('./api-client');

class AuthHelper {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.authToken = null;
  }

  async loginAsAdmin() {
    const response = await this.apiClient.login(
      'admin@juice-sh.op',
      'admin123'
    );
    this.authToken = response.data.authentication.token;
    this.apiClient.setAuthToken(this.authToken);
    return this.authToken;
  }

  async loginAsUser(email, password) {
    const response = await this.apiClient.login(email, password);
    this.authToken = response.data.authentication.token;
    this.apiClient.setAuthToken(this.authToken);
    return this.authToken;
  }

  async registerAndLogin(userData) {
    const timestamp = Date.now();
    const email = userData.email.replace('{{timestamp}}', timestamp);
    const userToRegister = { ...userData, email };

    await this.apiClient.register(userToRegister);
    const response = await this.apiClient.login(email, userData.password);
    this.authToken = response.data.authentication.token;
    this.apiClient.setAuthToken(this.authToken);
    return this.authToken;
  }

  logout() {
    this.authToken = null;
    this.apiClient.clearAuthToken();
  }

  getAuthToken() {
    return this.authToken;
  }
}

module.exports = AuthHelper;
```

### Чому це потрібно:

- **Auth management** - централізоване управління логіном/логаутом
- **Token handling** - автоматичне встановлення токенів
- **Convenience** - прості методи для різних сценаріїв аутентифікації

---

## ⚙️ КРОК 6: Налаштування Jest

### Що робити:

Створити конфігурацію Jest.

### Як це зробити:

#### Створити `jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'helpers/**/*.js',
    'tests/**/*.js',
    '!**/node_modules/**',
  ],
  testMatch: ['**/tests/**/*.spec.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 10000,
  verbose: true,
};
```

#### Створити `jest.setup.js`:

```javascript
// Глобальні налаштування перед запуском тестів
require('jest-extended');

// Глобальні змінні
global.BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
```

### Чому це потрібно:

- **Конфігурація** - налаштування поведінки Jest
- **Coverage** - автоматичний збір метрик покриття
- **Timeout** - налаштування тайм-аутів для тестів
- **Globals** - глобальні змінні для тестів

---

## 📝 КРОК 7: Переписування тестів - Auth

### Що робити:

Переписати тести для аутентифікації з використанням Jest та assertions.

### Як це зробити:

#### Створити `tests/auth/login.spec.js`:

```javascript
const ApiClient = require('../../helpers/api-client');
const AuthHelper = require('../../helpers/auth-helper');
const users = require('../../fixtures/users');

describe('Auth API - Login', () => {
  let apiClient;
  let authHelper;

  beforeEach(() => {
    apiClient = new ApiClient();
    authHelper = new AuthHelper(apiClient);
  });

  afterEach(() => {
    authHelper.logout();
  });

  test('POST /rest/user/login - успішний логін адміна', async () => {
    // Arrange
    const { email, password } = users.validAdmin;

    // Act
    const response = await apiClient.login(email, password);

    // Assert
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('authentication');
    expect(response.data.authentication).toHaveProperty('token');
    expect(response.data.authentication.token).toBeTruthy();
    expect(typeof response.data.authentication.token).toBe('string');
  });

  test('POST /rest/user/login - успішний логін користувача', async () => {
    // Arrange
    const { email, password } = users.validUser;

    // Act
    const response = await apiClient.login(email, password);

    // Assert
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('authentication');
    expect(response.data.authentication).toHaveProperty('token');
  });

  test('POST /rest/user/login - помилка з невірним паролем', async () => {
    // Arrange
    const { email } = users.validUser;
    const wrongPassword = 'wrongpassword';

    // Act
    const response = await apiClient
      .login(email, wrongPassword)
      .catch((err) => err.response);

    // Assert
    expect(response.status).toBe(401);
    expect(response.data).toHaveProperty('error');
  });

  test('POST /rest/user/login - помилка з неіснуючим email', async () => {
    // Arrange
    const { email, password } = users.invalidUser;

    // Act
    const response = await apiClient
      .login(email, password)
      .catch((err) => err.response);

    // Assert
    expect(response.status).toBe(401);
  });
});
```

#### Створити `tests/auth/register.spec.js`:

```javascript
const ApiClient = require('../../helpers/api-client');
const AuthHelper = require('../../helpers/auth-helper');
const users = require('../../fixtures/users');

describe('Auth API - Register', () => {
  let apiClient;
  let authHelper;

  beforeEach(() => {
    apiClient = new ApiClient();
    authHelper = new AuthHelper(apiClient);
  });

  test('POST /api/Users - успішна реєстрація нового користувача', async () => {
    // Arrange
    const timestamp = Date.now();
    const userData = {
      ...users.newUser,
      email: users.newUser.email.replace('{{timestamp}}', timestamp),
    };

    // Act
    const response = await apiClient.register(userData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('data');
    expect(response.data.data).toHaveProperty('id');
    expect(response.data.data).toHaveProperty('email');
    expect(response.data.data.email).toBe(userData.email);
  });

  test('POST /api/Users - помилка з дублікатом email', async () => {
    // Arrange
    const userData = users.validUser;

    // Act
    const response = await apiClient
      .register(userData)
      .catch((err) => err.response);

    // Assert
    expect(response.status).toBe(400);
  });

  test('POST /api/Users - помилка з невалідними даними', async () => {
    // Arrange
    const invalidData = {
      email: '',
      password: '',
    };

    // Act
    const response = await apiClient
      .register(invalidData)
      .catch((err) => err.response);

    // Assert
    expect(response.status).toBe(400);
  });
});
```

### Чому це потрібно:

- **Assertions** - перевірка результатів з proper expectations
- **Structure** - Arrange-Act-Assert pattern
- **Reusability** - використання helpers та fixtures
- **Maintainability** - зрозумілі та читабельні тести

---

## 📦 КРОК 8: Переписування тестів - Products

### Що робити:

Переписати тести для продуктів.

### Як це зробити:

#### Створити `tests/products/get-products.spec.js`:

```javascript
const ApiClient = require('../../helpers/api-client');

describe('Products API', () => {
  let apiClient;

  beforeEach(() => {
    apiClient = new ApiClient();
  });

  test('GET /api/Products - отримання списку продуктів', async () => {
    // Act
    const response = await apiClient.getProducts();

    // Assert
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(Array.isArray(response.data.data)).toBe(true);
    expect(response.data.data.length).toBeGreaterThan(0);

    // Перевірка структури першого продукту
    const firstProduct = response.data.data[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
  });

  test('GET /api/Products/:id - отримання продукту за ID', async () => {
    // Arrange
    const productsResponse = await apiClient.getProducts();
    const productId = productsResponse.data.data[0].id;

    // Act
    const response = await apiClient.getProductById(productId);

    // Assert
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(response.data.data.id).toBe(productId);
  });

  test('GET /api/Products/:id - помилка з неіснуючим ID', async () => {
    // Arrange
    const nonExistentId = 999999;

    // Act
    const response = await apiClient
      .getProductById(nonExistentId)
      .catch((err) => err.response);

    // Assert
    expect(response.status).toBe(404);
  });
});
```

### Чому це потрібно:

- **Coverage** - покриття CRUD операцій для продуктів
- **Edge cases** - тестування неіснуючих ID
- **Structure** - перевірка структури відповідей

---

## 🛒 КРОК 9: Переписування тестів - Basket

### Що робити:

Переписати тести для кошика з аутентифікацією.

### Як це зробити:

#### Створити `tests/basket/get-basket.spec.js`:

```javascript
const ApiClient = require('../../helpers/api-client');
const AuthHelper = require('../../helpers/auth-helper');

describe('Basket API', () => {
  let apiClient;
  let authHelper;

  beforeEach(async () => {
    apiClient = new ApiClient();
    authHelper = new AuthHelper(apiClient);
    await authHelper.loginAsAdmin();
  });

  afterEach(() => {
    authHelper.logout();
  });

  test('GET /api/BasketItems - отримання кошика залогіненого користувача', async () => {
    // Act
    const response = await apiClient.getBasket();

    // Assert
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(Array.isArray(response.data.data)).toBe(true);
  });

  test('POST /api/BasketItems - додавання товару в кошик', async () => {
    // Arrange
    const basketItem = {
      ProductId: 1,
      quantity: 1,
    };

    // Act
    const response = await apiClient.addToBasket(basketItem);

    // Assert
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
  });

  test('DELETE /api/BasketItems/:id - видалення товару з кошика', async () => {
    // Arrange - спочатку додати товар
    const addResponse = await apiClient.addToBasket({
      ProductId: 1,
      quantity: 1,
    });
    const itemId = addResponse.data.data.id;

    // Act - видалити товар
    const response = await apiClient.removeFromBasket(itemId);

    // Assert
    expect([200, 204]).toContain(response.status);
  });
});
```

### Чому це потрібно:

- **Auth** - тести з аутентифікацією
- **CRUD** - повне покриття операцій кошика
- **Setup/Teardown** - правильна ініціалізація та очищення

---

## ❌ КРОК 10: Додавання негативних тестів

### Що робити:

Додати тести для негативних сценаріїв та edge cases.

### Як це зробити:

#### Створити `tests/auth/negative.spec.js`:

```javascript
const ApiClient = require('../../helpers/api-client');

describe('Auth API - Negative Tests', () => {
  let apiClient;

  beforeEach(() => {
    apiClient = new ApiClient();
  });

  test('POST /rest/user/login - пусті поля', async () => {
    // Act
    const response = await apiClient.login('', '').catch((err) => err.response);

    // Assert
    expect(response.status).toBe(401);
  });

  test('POST /rest/user/login - SQL Injection спроба', async () => {
    // Arrange
    const sqlInjection = "' OR '1'='1";

    // Act
    const response = await apiClient
      .login(sqlInjection, sqlInjection)
      .catch((err) => err.response);

    // Assert
    expect(response.status).toBe(401);
  });

  test('POST /rest/user/login - XSS спроба', async () => {
    // Arrange
    const xssPayload = '<script>alert("xss")</script>';

    // Act
    const response = await apiClient
      .login(xssPayload, 'password')
      .catch((err) => err.response);

    // Assert
    expect(response.status).toBe(401);
  });

  test('POST /api/Users - дуже довгий email', async () => {
    // Arrange
    const longEmail = 'a'.repeat(1000) + '@test.com';
    const userData = {
      email: longEmail,
      password: 'Test123!',
      passwordRepeat: 'Test123!',
      securityQuestion: { id: 1, answer: 'Test' },
    };

    // Act
    const response = await apiClient
      .register(userData)
      .catch((err) => err.response);

    // Assert
    expect(response.status).toBe(400);
  });
});
```

### Чому це потрібно:

- **Security** - тестування вразливостей
- **Validation** - перевірка валідації даних
- **Edge cases** - граничні значення

---

## 📦 КРОК 11: Оновлення package.json

### Що робити:

Оновити скрипти в package.json для запуску Jest тестів.

### Як це зробити:

```json
{
  "name": "juice-shop-api-tests",
  "version": "2.0.0",
  "description": "API tests for OWASP Juice Shop with Jest",
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:verbose": "jest --verbose"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "jest-extended": "^4.0.2",
    "axios": "^1.6.0"
  },
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

### Чому це потрібно:

- **Convenience** - прості команди для запуску тестів
- **Coverage** - команда для збору метрик
- **Watch mode** - автоматичний перезапуск при змінах

---

## 🔄 КРОК 12: Оновлення CI/CD

### Що робити:

Оновити GitHub Actions workflow для Jest тестів.

### Як це зробити:

#### Оновити `.github/workflows/api-tests.yml`:

```yaml
name: API Tests

on:
  push:
    branches: [main, master, develop]
  pull_request:
    branches: [main, master, develop]
  workflow_dispatch:

jobs:
  api-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        working-directory: ./api-tests
        run: npm install

      - name: Start Juice Shop with Docker
        run: |
          docker run -d -p 3000:3000 bkimminich/juice-shop
          sleep 15

      - name: Run API tests
        working-directory: ./api-tests
        run: npm test

      - name: Upload coverage
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: api-tests/coverage/
          retention-days: 30
```

### Чому це потрібно:

- **CI/CD** - автоматичний запуск Jest тестів
- **Coverage** - завантаження звітів покриття
- **Integration** - інтеграція з існуючим workflow

---

## 🧪 КРОК 13: Запуск та перевірка тестів

### Що робити:

Запустити тести та перевірити результати.

### Як це зробити:

```bash
cd e:\Projects\Juice_Shop\test-portfolio\api-tests

# Запуск всіх тестів
npm test

# Запуск з coverage
npm run test:coverage

# Запуск в watch mode
npm run test:watch

# Запуск конкретного файлу
npx jest tests/auth/login.spec.js

# Запуск з детальним виводом
npm run test:verbose
```

### Перевірка результатів:

- Перевірте що всі тести проходять
- Перевірте coverage звіт в папці `coverage/`
- Перевірте що негативні тести працюють

---

## 📊 КРОК 14: Видалення старого коду

### Що робити:

Видалити старий файл `api-tests.js` після успішної міграції.

### Як це зробити:

```bash
cd e:\Projects\Juice_Shop\test-portfolio\api-tests

# Видалення старого файлу
rm api-tests.js

# Або в PowerShell
Remove-Item api-tests.js
```

### Чому це потрібно:

- **Clean code** - видалення застарілого коду
- **Confusion prevention** - уникнення плутанини між старим та новим кодом

---

## ✅ Перевірочний список

Переконайтеся що ви виконали всі кроки:

- [ ] Jest та залежності встановлені
- [ ] Структура папок створена
- [ ] Fixtures створені
- [ ] ApiClient helper створений
- [ ] AuthHelper створений
- [ ] Jest конфігурація налаштована
- [ ] Auth тести переписані
- [ ] Products тести переписані
- [ ] Basket тести переписані
- [ ] Негативні тести додані
- [ ] package.json оновлений
- [ ] CI/CD workflow оновлений
- [ ] Тести запущені та проходять
- [ ] Coverage звіт перевірений
- [ ] Старий код видалений

---

## 🎯 Очікуваний результат

Після виконання всіх кроків ви матимете:

1. **Структуровані тести** - організовані за функціональністю
2. **Proper assertions** - перевірка результатів з Jest matchers
3. **Reusable helpers** - ApiClient та AuthHelper для повторного використання
4. **Test fixtures** - централізовані тестові дані
5. **Negative tests** - покриття негативних сценаріїв
6. **Coverage reports** - автоматичний збір метрик
7. **CI/CD integration** - автоматичний запуск в GitHub Actions

---

## 📚 Корисні ресурси

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Jest Matchers](https://jestjs.io/docs/expect)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Jest Extended](https://github.com/jest-community/jest-extended)

---

**Документ створено:** 23.05.2026
