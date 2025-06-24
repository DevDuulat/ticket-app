import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Удаляем существующие данные
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await hash('password123', 10);

  // Создаем тестовых пользователей
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'SUPERVISOR',
      },
      {
        name: 'Operator 1',
        email: 'operator1@example.com',
        password: hashedPassword,
        role: 'OPERATOR',
      },
      {
        name: 'Operator 2',
        email: 'operator2@example.com',
        password: hashedPassword,
        role: 'OPERATOR',
      },
    ],
  });

  // Получаем ID созданных пользователей
  const admin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });
  const operator1 = await prisma.user.findUnique({
    where: { email: 'operator1@example.com' },
  });
  const operator2 = await prisma.user.findUnique({
    where: { email: 'operator2@example.com' },
  });

  // Создаем тестовые тикеты
  const tickets = await prisma.ticket.createMany({
    data: [
      {
        title: 'Проблема с интернетом',
        description: 'Не работает интернет в кабинете 301',
        subscriber: 'user1@company.com',
        status: 'OPEN',
        assignedToId: operator1?.id,
      },
      {
        title: 'Не печатает принтер',
        description:
          'Принтер в отделе бухгалтерии не реагирует на задания печати',
        subscriber: 'accounting@company.com',
        status: 'IN_PROGRESS',
        assignedToId: operator2?.id,
      },
      {
        title: 'Требуется новая мышь',
        description: 'Сломалась компьютерная мышь, нужна замена',
        subscriber: 'employee@company.com',
        status: 'CLOSED',
        assignedToId: operator1?.id,
      },
    ],
  });

  // Получаем созданные тикеты
  const createdTickets = await prisma.ticket.findMany();

  // Создаем комментарии к тикетам
  await prisma.comment.createMany({
    data: [
      {
        content:
          'Проверил кабель, проблема не в этом. Нужна диагностика роутера.',
        authorId: operator1?.id || 0,
        ticketId: createdTickets[0]?.id || 0,
      },
      {
        content: 'Перезагрузил принтер, проблема сохраняется.',
        authorId: operator2?.id || 0,
        ticketId: createdTickets[1]?.id || 0,
      },
      {
        content: 'Мышь заменена, тикет можно закрывать.',
        authorId: operator1?.id || 0,
        ticketId: createdTickets[2]?.id || 0,
      },
      {
        content: 'Роутер заменен, проблема решена.',
        authorId: admin?.id || 0,
        ticketId: createdTickets[0]?.id || 0,
      },
    ],
  });

  console.log('Seeding completed successfully!');
  console.log(`Created: ${users.count} users, ${tickets.count} tickets`);
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
