FROM node:18-alpine

WORKDIR /app

# Копіюємо package files
COPY package*.json ./

# Встановлюємо всі залежності (включаючи dev)
RUN npm install

# Копіюємо весь код
COPY . .

EXPOSE 3000

# Команда буде перевизначена в docker-compose для режиму розробки
CMD ["npm", "run", "start"]
