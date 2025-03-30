FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Собираем приложение
RUN npm run build

# Запускаем приложение
CMD ["npm", "run", "dev"]

EXPOSE 3000 