FROM node:18-alpine

WORKDIR /app

# Копіюємо package files
COPY package*.json ./

# Встановлюємо всі залежності (включаючи dev)
RUN npm install

# Копіюємо весь код
COPY . .

# Генеруємо Prisma клієнт
RUN npx prisma generate

EXPOSE 3001

# Команда буде перевизначена в docker-compose для режиму розробки
CMD ["npm", "run", "start"]
