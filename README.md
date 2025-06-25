
## Установка и запуск

### 1. Клонирование проекта

```bash
git clone https://github.com/DevDuulat/ticket-app.git
cd ticket-app
git checkout dev
````

### 2. Создание .env файла для backend

```bash
cd backend
touch .env
```

## Содержимое .env:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/ticket_db?schema=public
JWT_SECRET=h1wHcIr8vxltVcyMGjtPWrfgjkZgBTSirhyNJwPcUFOQ6PZtw9Cn2vRye+DB9SF4
```

---

### 3. Установка зависимостей и сборка backend вручную (один раз)

Перед сборкой Docker рекомендуется локально установить зависимости и собрать проект, чтобы избежать ошибок при `docker build`.

```bash
cd backend
npm install
npm run build
cd ..
```

---

### 4. Сборка и запуск проекта

```bash
docker-compose build
docker-compose up
```

---

## 5. Доступ к приложению

Откройте в браузере:

```
http://localhost:8080/
```

---

### 6. Данные для входа

```txt
Логин:   alice@mail.ru  
Пароль:  alice@mail.ru
```

---

## 7. Полезные команды

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

## Скриншоты интерфейса

### Страница входа

![image](https://github.com/user-attachments/assets/400c52fb-c239-4419-ace7-521dd31413b1)

### Страница тикетов

![image](https://github.com/user-attachments/assets/f9b7bb9d-aec0-467a-b83c-38136dc5baf6)

### Страница тикета

![image](https://github.com/user-attachments/assets/8c9190fa-324c-4b48-abcf-c0b9da4efb45)

### Создание тикетов

![image](https://github.com/user-attachments/assets/9e974da8-7c65-4b63-b95f-74bcdcb25b1c)

```

---

