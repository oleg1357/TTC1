#!/bin/bash

# Ждем, пока PostgreSQL будет готов
echo "Waiting for PostgreSQL to be ready..."
while ! nc -z postgres 5432; do
  sleep 0.1
done
echo "PostgreSQL is ready!"

# Запускаем скрипт инициализации базы данных
psql -h postgres -U postgres -d social_network -f /app/src/seed/init.sql

# Запускаем скрипт создания начального пользователя
echo "Creating initial user..."
npm run seed:user

echo "Database initialization completed!" 