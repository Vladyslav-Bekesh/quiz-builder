# Quiz Builder

Повнофункціональна платформа для створення квізів з різними типами питань. Проект складається з бекенду на NestJS та фронтенду на Next.js.

## Функції

- ✅ Створення квізів з різними типами питань (True/False, Input Text, Multiple Choice)
- ✅ Перегляд всіх доступних квізів
- ✅ Детальний перегляд кожного квізу
- ✅ Видалення квізів
- ✅ Мобільний адаптивний дизайн
- ✅ TypeScript для типізації
- ✅ Валідація форм
- ✅ ESLint та Prettier для якості коду

## Технічний стек

### Backend
- **NestJS** - фреймворк для Node.js
- **TypeScript** - типізація коду
- **Prisma** - ORM для роботи з базою даних
- **PostgreSQL** - база даних
- **Class Validator** - валідація даних

### Frontend
- **Next.js** - React фреймворк
- **TypeScript** - типізація коду
- **React Hook Form** - управління формами
- **Zod** - схема валідації
- **Tailwind CSS** - стилізація
- **Lucide React** - іконки

## Структура проекту

```
quiz-builder/
├── backend/         # NestJS додаток
│   ├── src/
│   │   ├── quiz/   # Модуль для роботи з квізами
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/     # Схема бази даних
│   └── package.json
├── frontend/        # Next.js додаток
│   ├── src/
│   │   ├── app/     # Сторінки додатку
│   │   ├── components/  # React компоненти
│   │   ├── services/    # API сервіси
│   │   └── types/   # TypeScript типи
│   └── package.json
└── README.md
```

## Встановлення та запуск

### Опция 1: Запуск з Docker (Рекомендується)

Найпростіший спосіб запуску проекту:

```bash
# Клонуйте репозиторій
git clone <repository-url>
cd quiz-builder

# Швидка ініціалізація (рекомендується)
chmod +x docker-init.sh
./docker-init.sh

# АБО вручну:
# Запустіть весь проект (PostgreSQL + Backend + Frontend)
docker-compose up

# Або запустіть у фоновому режимі
docker-compose up -d
```

Проект буде доступний:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432

**Зупинка проекту:**
```bash
docker-compose down
```

### Опция 2: Локальний запуск

### Передумови
- Node.js (v18 або новіша версія)
- PostgreSQL
- npm або yarn

### 1. Налаштування бази даних

Створіть PostgreSQL базу даних:
```sql
CREATE DATABASE quiz_builder;
```

Скопіюйте конфігураційний файл у папці backend:
```bash
cp backend/.env.example backend/.env
```

Оновіть дані підключення в `backend/.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/quiz_builder?schema=public"
PORT=3001
```

### 2. Налаштування бекенду

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

Бекенд буде доступний за адресою `http://localhost:3001`

### 3. Налаштування фронтенду

```bash
cd frontend
npm install
npm run dev
```

Фронтенд буде доступний за адресою `http://localhost:3000`

### 4. Скопіювання конфігурації фронтенду

Скопіюйте файл конфігурації:
```bash
cp frontend/.env.example frontend/.env.local
```

Оновіть URL бекенду в `frontend/.env.local` якщо потрібно:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Docker команди

### Основний запуск
```bash
# Запуск всього проекту
docker-compose up

# Запуск у фоновому режимі
docker-compose up -d

# Зупинка проекту
docker-compose down

# Перебудова контейнерів (якщо змінили код)
docker-compose up --build
```

### Робота з базою даних через Docker
```bash
# Виконання Prisma міграцій в контейнері backend
docker-compose exec backend npx prisma migrate dev

# Відкриття Prisma Studio
docker-compose exec backend npx prisma studio
```

## API Ендпоінти

### Quizzes
- `POST /quizzes` - Створити новий квіз
- `GET /quizzes` - Отримати список всільк квізів
- `GET /quizzes/:id` - Отримати деталі квізу
- `DELETE /quizzes/:id` - Видалити квіз

### Структура даних

#### Quiz
```typescript
{
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}
```

#### Question
```typescript
{
  id: string;
  question: string;
  type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
  options: string[];
  correctAnswer?: string;
  quizId: string;
  createdAt: string;
  updatedAt: string;
}
```

## Використання

1. **Створення квізу**: Перейдіть на `/create`, заповніть форму з назвою та питаннями
2. **Перегляд квізів**: На головній сторінці (`/quizzes`) відображаються всі створені квізи
3. **Детальний перегляд**: Клікніть "View" на картці квізу для перегляду деталей
4. **Видалення**: Клікніть іконку корзини для видалення квізу

## Розробка

### Команди для бекенду
```bash
npm run start:dev     # Запуск в режимі розробки
npm run build         # Збірка проекту
npm run lint          # Перевірка ESLint
npm run format        # Форматування Prettier
npm run prisma:studio # Prisma Studio (GUI для бази даних)
```

### Команди для фронтенду
```bash
npm run dev           # Запуск в режимі розробки
npm run build         # Збірка проекту
npm run start         # Запуск продакшн версії
npm run lint          # Перевірка ESLint/components
```

## Створення прикладеного квізу

Для створення тестового квізу можете використати наступні дані:

**Назва**: "JavaScript Fundamentals Quiz"

**Питання**:
1. **Тип**: True/False
   - Питання: "JavaScript це компільована мова програмування"
   - Правильна відповідь: "false"

2. **Тип**: Input Text
   - Питання: "Який ключове слово використовується для оголошення зручних функцій?"
   - Правильна відповідь: "function"

3. **Тип**: Multiple Choice
   - Питання: "Які з наступних є примітивними типами в JavaScript?"
   - Варіанти: ["string", "number", "boolean", "object", "function"]
   - Правильна відповідь: "string,number,boolean"

## Ліцензія

MIT License

## Контакти

Якщо у вас виникли питання або проблеми з проектом, будь ласка, створіть issue в репозиторії.

