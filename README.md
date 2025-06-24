

# Ticket App

Полноценное веб-приложение для управления заявками (тикетами), построенное на стеке **NestJS**, **Vue.js** и **PostgreSQL**. Поддерживает роли `SUPERVISOR` и `OPERATOR`.

---

## Стек технологий

- **Backend**: [NestJS](https://nestjs.com/) + [Prisma ORM](https://www.prisma.io/)
- **Frontend**: [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- **Auth**: JWT авторизация
- **Database**: PostgreSQL
- **DevOps**: Docker + Docker Compose

---

## Установка и запуск

> Убедитесь, что у вас установлен Docker и Docker Compose.

### 1. Клонирование проекта

```bash
git clone https://github.com/DevDuulat/ticket-app.git
cd ticket-app
git checkout dev
````

### 2. Сборка и запуск

```bash
docker-compose build
docker-compose up
```

---
##  Доступ к приложению

Откройте в браузере:

```
http://localhost:8080/
```

### Данные для входа

```txt
Логин:   alice@mail.ru  
Пароль:  alice@mail.ru
```

---

## Полезные команды

Если вы работаете с backend вручную:

```bash
# Запуск миграций
npx prisma migrate deploy

# Сидинг базы (создание начальных пользователей)
npx prisma db seed

# Генерация Prisma клиента (если вы меняли schema.prisma)
npx prisma generate
```

---


---

##  Переменные окружения

Для локальной разработки переменные уже прописаны в `docker-compose.yml`.

Если нужно использовать `.env`, то пример:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/ticket_db?schema=public
JWT_SECRET=your_jwt_secret
```

---


