# Скрипт для запуску сервера та тестів
Write-Host "🚀 Запуск Juice Shop сервера..." -ForegroundColor Green

# Запуск сервера в фоновому режимі
$serverProcess = Start-Process -FilePath "npm" -ArgumentList "start" -WorkingDirectory "e:/Projects/Juice_Shop/juice-shop" -PassThru -NoNewWindow

# Чекаємо 10 секунд для запуску сервера
Write-Host "⏳ Чекаємо 10 секунд для запуску сервера..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Перевірка чи сервер працює
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Сервер успішно запущено!" -ForegroundColor Green
} catch {
    Write-Host "❌ Помилка запуску сервера" -ForegroundColor Red
    Stop-Process -Id $serverProcess.Id
    exit 1
}

# Запуск API тестів
Write-Host "🧪 Запуск API тестів..." -ForegroundColor Green
cd e:/Projects/Juice_Shop/test-portfolio/api-tests
node api-tests.js

# Запуск UI тестів
Write-Host "🎨 Запуск UI тестів..." -ForegroundColor Green
cd e:/Projects/Juice_Shop/test-portfolio/ui-tests
npx playwright test

# Зупинка сервера
Write-Host "🛑 Зупинка сервера..." -ForegroundColor Yellow
Stop-Process -Id $serverProcess.Id
Write-Host "✅ Сервер зупинено" -ForegroundColor Green

Write-Host "📊 Всі тести завершено!" -ForegroundColor Green
