#!/bin/bash

# Команда для ініціалізації проекту з Docker
echo "🚀 Ініціалізація Quiz Builder проекту..."

# Будуємо та запускаємо контейнери
echo "📦 Збірка та запуск контейнерів..."
docker-compose up -d

# Чекаємо поки PostgreSQL буде готовий
echo "⏳ Чекаємо готовності PostgreSQL..."
sleep 10

# Запускаємо міграції бази даних
echo "🗄️  Запуск міграцій бази даних..."
docker-compose exec backend npx prisma migrate dev

echo "✅ Проект готовий!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001"
echo "📊 PostgreSQL: localhost:5432"
echo ""
echo "Для зупинки використовуйте: docker-compose down"

