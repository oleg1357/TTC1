# Профиль пользователя с лентой постов

Проект представляет собой веб-приложение для управления профилем пользователя и его постами. Реализован с использованием React.js + TypeScript на фронтенде и Nest.js на бэкенде.

## Структура проекта

```
.
├── frontend/          # React.js + TypeScript приложение
└── backend/          # Nest.js API сервер
```

## Требования

- Node.js >= 18
- Docker и Docker Compose
- PostgreSQL

## Установка и запуск

### Backend

1. Перейдите в директорию backend:
```bash
cd backend
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл .env на основе .env.example:
```bash
cp .env.example .env
```

4. Запустите приложение через Docker Compose:
```bash
docker-compose up -d
```

### Frontend

1. Перейдите в директорию frontend:
```bash
cd frontend
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл .env на основе .env.example:
```bash
cp .env.example .env
```

4. Запустите приложение:
```bash
npm run dev
```

## Функциональность

### Профиль пользователя
- Просмотр и редактирование информации о пользователе
- Загрузка и обновление аватара
- Управление контактными данными

### Лента постов
- Создание, редактирование и удаление постов
- Загрузка изображений к постам
- Пагинация и сортировка
- Бесконечная прокрутка

## Технологии

### Frontend
- React.js
- TypeScript
- Tanstack Query
- Zustand
- shadcn/ui
- React Dropzone

### Backend
- Nest.js
- PostgreSQL
- TypeORM
- JWT аутентификация
- Docker 