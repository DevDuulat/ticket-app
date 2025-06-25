#!/bin/sh
set -e

# Запускаем миграции
npx prisma migrate deploy

# Запускаем сидер
npx prisma db seed

# Запускаем приложение
npm run start:prod
