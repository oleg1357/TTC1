FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Копируем скрипты инициализации
COPY src/seed/init.sql ./src/seed/
COPY src/seed/init.sh ./src/seed/
RUN chmod +x ./src/seed/init.sh

# Устанавливаем netcat для проверки доступности PostgreSQL
RUN apk add --no-cache netcat-openbsd

# Собираем приложение
RUN npm run build

# Запускаем скрипт инициализации и приложение
CMD ["./src/seed/init.sh"]

EXPOSE 3000 