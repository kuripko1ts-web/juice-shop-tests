# Juice Shop Test Portfolio

Повний проект для автоматизованого тестування OWASP Juice Shop - вразливого веб-додатку для навчання з веб-безпеки.

## 📋 Зміст

- [Про проект](#про-проект)
- [Структура проекту](#структура-проекту)
- [Тестове портфоліо](#тестове-портфоліо)
- [Швидкий старт](#швидкий-старт)
- [Технології](#технології)
- [Документація](#документація)

## 📁 Про проект

Цей проект містить повне тестове портфоліо для OWASP Juice Shop, включаючи:
- UI тести з Playwright
- API тести з Jest
- GitHub Actions workflows для CI/CD
- Page Object Model архітектуру

## 🏗 Структура проекту

```
Juice_Shop/
├── test-portfolio/         # Головна папка з тестами
│   ├── .github/           # GitHub Actions workflows
│   ├── api-tests/         # API тести (Jest)
│   ├── ui-tests2/         # UI тести (Playwright)
│   ├── README.md          # Детальна документація тестів
│   └── run-all.ps1        # Скрипт для запуску всіх тестів
├── juice-shop/           # Оригінальний Juice Shop код
├── backup-*/             # Бекапи тестів
└── README.md             # Цей файл
```

## 🧪 Тестове портфоліо

### UI Тести (Playwright)
- **Smoke тести:** Критичні функції (логін, кошик, замовлення)
- **Regression тести:** Повний функціонал
- **Registration тести:** Реєстрація та валідація форм
- **Інтегровані тести:** Життєвий цикл користувача

### API Тести (Jest)
- **Основні API тести:** CRUD операції, аутентифікація
- **OWASP Security тести:** OWASP Top 10 вразливості
- **Search API тести:** Пошук продуктів
- **Negative тести:** Невалідні дані та ін'єкції

### Page Object Model
- BasePage.js - базова сторінка
- LoginPage.js - сторінка логіну
- CartPage.js - сторінка кошика
- RegistrationPage.js - сторінка реєстрації

## 🚀 Швидкий старт

### Вимоги
- Node.js 20+
- npm або yarn

### Запуск тестів

```bash
# Перейдіть в папку тестів
cd test-portfolio

# API тести
cd api-tests
npm install
npm test

# UI тести
cd ui-tests2
npm install
npx playwright install chromium
npx playwright test
```

### Детальна документація
Дивіться детальну документацію в [test-portfolio/README.md](./test-portfolio/README.md)

## 🛠 Технології

### UI Тести
- **Framework:** Playwright
- **Runtime:** Node.js 20+
- **Browsers:** Chromium
- **Pattern:** Page Object Model

### API Тести
- **Framework:** Jest
- **Runtime:** Node.js 20+
- **HTTP Client:** Axios

### CI/CD
- **Platform:** GitHub Actions
- **OS:** Ubuntu Latest
- **Docker:** Juice Shop container

## 📚 Документація

- [Детальна документація тестів](./test-portfolio/README.md)
- [CI/CD Guide](./test-portfolio/CI_CD_GUIDE.txt)

## 🌐 OWASP Juice Shop

OWASP Juice Shop - найсучасніше вразливе веб-додаток для:
- 🎓 Навчання з веб-безпеки
- 🛡 Тренінгів з пентестингу
- 🏆 CTF змагань
- 🔧 Тестування інструментів безпеки

**Офіційний сайт:** https://owasp.org/www-project-juice-shop/

## 👤 Автор

Тестове портфоліо для демонстрації навичок автоматизованого тестування.

---

**GitHub Repository:** https://github.com/kuripko1ts-web/juice-shop-tests
