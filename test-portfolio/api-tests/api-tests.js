// ============================================
// ПРИМІТНИЙ КОМЕНТАР ДЛЯ ПОЧАТКІВЦІВ
// ============================================
// Цей файл демонструє як тестувати API за допомогою бібліотеки axios
// axios - це інструмент для виконання HTTP запитів (GET, POST, PUT, DELETE)
// Ми тестуємо OWASP Juice Shop - вразливий веб-додаток

// Підключаємо бібліотеку axios для HTTP запитів
const axios = require('axios');

// URL нашого локального сервера Juice Shop
// localhost:3000 - це локальний сервер на твоєму комп'ютері
const BASE_URL = 'http://localhost:3000';

// ============================================
// КЛАС ДЛЯ ТЕСТУВАННЯ API
// ============================================
class JuiceShopAPITests {
  constructor() {
    // Створюємо HTTP клієнт (налаштований для роботи з Juice Shop)
    // baseURL - базова URL адреса, до якої додаватимуться всі запити
    // headers - заголовки, які кажуть серверу що ми відправляємо JSON
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // ============================================
  // ТЕСТ 1: ОТРИМАННЯ СПИСКУ ПРОДУКТІВ
  // ============================================
  // Що робимо: Запитуємо список всіх товарів у магазині
  // Звідки береться: /api/Products - це API endpoint в Juice Shop
  // Метод HTTP: GET (отримати дані)
  async testGetProducts() {
    try {
      console.log('🧪 Тест 1: Отримання списку продуктів');
      
      // Виконуємо GET запит на /api/Products
      // Це те саме що ввести в браузері: http://localhost:3000/api/Products
      const response = await this.client.get('/api/Products');
      
      // response.status - це HTTP статус-код (200 = успішно)
      console.log(`✅ Статус: ${response.status}`);
      
      // response.data.data - це масив з продуктами від сервера
      // .length - кількість елементів в масиві
      console.log(`📦 Кількість продуктів: ${response.data.data.length}`);
      
      return { test: 'GetProducts', status: 'PASS', statusCode: response.status };
    } catch (error) {
      console.log(`❌ Помилка: ${error.message}`);
      return { test: 'GetProducts', status: 'FAIL', error: error.message };
    }
  }

  // ============================================
  // ТЕСТ 2: РЕЄСТРАЦІЯ НОВОГО КОРИСТУВАЧА
  // ============================================
  // Що робимо: Створюємо нового користувача в системі
  // Звідки береться: /api/Users - це API endpoint для реєстрації
  // Метод HTTP: POST (відправити дані для створення)
  async testRegisterUser() {
    try {
      console.log('🧪 Тест 2: Реєстрація нового користувача');
      
      // Date.now() - поточний час в мілісекундах (для унікального email)
      const timestamp = Date.now();
      
      // Дані користувача для реєстрації
      // email - має бути унікальним, тому додаємо timestamp
      // password - пароль користувача
      // securityQuestion - секретне питання для відновлення пароля
      const userData = {
        email: `test${timestamp}@test.com`,
        password: 'Test123456!',
        passwordRepeat: 'Test123456!',
        securityQuestion: {
          id: 1,                    // ID питання (1 = перше питання в базі)
          answer: 'Test'            // Відповідь на питання
        }
      };
      
      // Виконуємо POST запит з даними користувача
      const response = await this.client.post('/api/Users', userData);
      
      console.log(`✅ Статус: ${response.status}`);
      console.log(`👤 ID користувача: ${response.data.data.id}`);
      
      return { test: 'RegisterUser', status: 'PASS', statusCode: response.status, userId: response.data.data.id };
    } catch (error) {
      console.log(`❌ Помилка: ${error.message}`);
      return { test: 'RegisterUser', status: 'FAIL', error: error.message };
    }
  }

  // ============================================
  // ТЕСТ 3: ЛОГІН КОРИСТУВАЧА
  // ============================================
  // Що робимо: Логінимося в систему з email та паролем
  // Звідки береться: /rest/user/login - це API endpoint для логіну
  // Метод HTTP: POST (відправити email та пароль)
  async testLogin() {
    try {
      console.log('🧪 Тест 3: Логін користувача');
      
      // Дані для логіну
      // admin@juice-sh.op - це стандартний адмін в Juice Shop
      // admin123 - стандартний пароль адміна
      const loginData = {
        email: 'admin@juice-sh.op',
        password: 'admin123'
      };
      
      // Виконуємо POST запит для логіну
      const response = await this.client.post('/rest/user/login', loginData);
      
      console.log(`✅ Статус: ${response.status}`);
      
      // response.data.authentication.token - це JWT токен для аутентифікації
      // substring(0, 20) - показує тільки перші 20 символів токена
      console.log(`🔑 Токен: ${response.data.authentication.token.substring(0, 20)}...`);
      
      return { test: 'Login', status: 'PASS', statusCode: response.status };
    } catch (error) {
      console.log(`❌ Помилка: ${error.message}`);
      return { test: 'Login', status: 'FAIL', error: error.message };
    }
  }

  // ============================================
  // ТЕСТ 4: ОТРИМАННЯ КОШИКА
  // ============================================
  // Що робимо: Отримуємо товари, які користувач додав в кошик
  // Звідки береться: /api/BasketItems - це API endpoint для кошика
  // Метод HTTP: GET (отримати дані)
  // ПРИМІТКА: Цей тест потребує аутентифікації (токена з логіну)
  async testGetBasket() {
    try {
      console.log('🧪 Тест 4: Отримання кошика');
      
      // Виконуємо GET запит на /api/BasketItems
      // Це може не працювати без токена аутентифікації
      const response = await this.client.get('/api/BasketItems');
      
      console.log(`✅ Статус: ${response.status}`);
      console.log(`🛒 Кількість товарів у кошику: ${response.data.data.length}`);
      
      return { test: 'GetBasket', status: 'PASS', statusCode: response.status };
    } catch (error) {
      console.log(`❌ Помилка: ${error.message}`);
      return { test: 'GetBasket', status: 'FAIL', error: error.message };
    }
  }

  // ============================================
  // ТЕСТ 5: ОТРИМАННЯ ІНФОРМАЦІЇ ПРО КОРИСТУВАЧА
  // ============================================
  // Що робимо: Отримуємо інформацію про поточного користувача
  // Звідки береться: /rest/user/whoami - це API endpoint для інформації
  // Метод HTTP: GET (отримати дані)
  async testGetUserInfo() {
    try {
      console.log('🧪 Тест 5: Отримання інформації про користувача');
      
      // Виконуємо GET запит на /rest/user/whoami
      const response = await this.client.get('/rest/user/whoami');
      
      console.log(`✅ Статус: ${response.status}`);
      console.log(`👤 Інформація отримана`);
      
      return { test: 'GetUserInfo', status: 'PASS', statusCode: response.status };
    } catch (error) {
      console.log(`❌ Помилка: ${error.message}`);
      return { test: 'GetUserInfo', status: 'FAIL', error: error.message };
    }
  }

  // ============================================
  // ЗАПУСК ВСІХ ТЕСТІВ
  // ============================================
  async runAllTests() {
    console.log('🚀 Запуск API тестів для OWASP Juice Shop');
    console.log(`🌐 Тестове середовище: ${BASE_URL}`);
    console.log('=' .repeat(50));

    // Масив для зберігання результатів тестів
    const results = [];
    
    // Запускаємо кожен тест по черзі
    // await - чекаємо завершення кожного тесту перед наступним
    results.push(await this.testGetProducts());
    console.log('-' .repeat(50));
    
    results.push(await this.testRegisterUser());
    console.log('-' .repeat(50));
    
    results.push(await this.testLogin());
    console.log('-' .repeat(50));
    
    results.push(await this.testGetBasket());
    console.log('-' .repeat(50));
    
    results.push(await this.testGetUserInfo());
    console.log('=' .repeat(50));

    // Підраховуємо результати
    const passed = results.filter(r => r.status === 'PASS').length;
    const failed = results.filter(r => r.status === 'FAIL').length;
    
    console.log('\n📊 РЕЗУЛЬТАТИ ТЕСТІВ:');
    console.log(`✅ Пройдено: ${passed}/${results.length}`);
    console.log(`❌ Провалено: ${failed}/${results.length}`);
    
    return results;
  }
}

// ============================================
// ЗАПУСК ТЕСТІВ
// ============================================
// Створюємо екземпляр класу тестів
const tests = new JuiceShopAPITests();
// Запускаємо всі тести
tests.runAllTests().catch(console.error);
