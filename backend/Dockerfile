# Этап 1: Установка зависимостей и сборка Prisma клиента
FROM node:20-alpine AS builder

# Рабочая директория
WORKDIR /app

COPY . .

# Генерируем Prisma Client
RUN yarn prisma generate

# Этап 2: Запуск приложения
FROM node:20-alpine

WORKDIR /app

# Копируем зависимости и билд с предыдущего этапа
COPY --from=builder /app /app

# Открываем порт
EXPOSE 3000

# Команда для запуска приложения
CMD ["yarn", "start:dev"]
