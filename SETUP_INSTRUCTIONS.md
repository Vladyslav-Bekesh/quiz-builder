# Інструкції для налаштування Quiz Builder

## 1. Встановлення Docker Desktop

1. Завантажте Docker Desktop з https://www.docker.com/products/docker-desktop/
2. Встановіть Docker Desktop
3. Під час встановлення обов'язково увімкніть WSL 2 integration
4. Перезапустіть комп'ютер
5. Перевірте що Docker працює:
   ```bash
   docker --version
   ```

## 2. Запуск проекту

### Після встановлення Docker виконайте:

1. Відкрийте PowerShell в корені проекту (`D:\Repos\quiz-builder`)

2. Запустіть всі сервіси через Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Встановіть залежності для бекенду та фронтенду:
   ```bash
   # Бекенд
   docker-compose exec backend npm install
   
   # Фронтенд  
   docker-compose exec frontend npm install
   ```

4. Створіть базу даних та міграції Prisma:
   ```bash
   docker-compose exec backend npx prisma migrate dev --name init
   docker-compose exec backend npx prisma generate
   ```

5. Перевірте що всі сервіси працюють:
   ```bash
   docker-compose ps
   ```

## 3. Доступ до сервісів

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database**: localhost:5432

## 4. Перевірка роботи API

Відкрийте браузер на http://localhost:3000 та створіть новий квіз. API запити повинні успішно оброблятися без помилок в мережі.

## 5. Зупинка сервісів

```bash
docker-compose down
```

## Вирішення проблем

Якщо виникнуть проблеми з CORS або мережевими запитами:
1. Перевірте що всі контейнери працюють: `docker-compose ps`
2. Перевірте логи: `docker-compose logs backend`
3. Перевірте що база даних запущена: `docker-compose logs postgres`

