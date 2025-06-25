const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.createMany({
    data: [
      { name: 'Admin', email: 'admin@example.com', password: hashedPassword, role: 'SUPERVISOR' },
      { name: 'Operator 1', email: 'operator1@example.com', password: hashedPassword, role: 'OPERATOR' },
      { name: 'Operator 2', email: 'operator2@example.com', password: hashedPassword, role: 'OPERATOR' },
    ],
  });

  const admin = await prisma.user.findUnique({ where: { email: 'admin@example.com' } });
  const operator1 = await prisma.user.findUnique({ where: { email: 'operator1@example.com' } });
  const operator2 = await prisma.user.findUnique({ where: { email: 'operator2@example.com' } });

  await prisma.ticket.createMany({
    data: [
      {
        title: 'Проблема с интернетом',
        description: 'Не работает интернет в кабинете 301',
        subscriber: 'user1@company.com',
        status: 'OPEN',
        assignedToId: operator1.id,
      },
      {
        title: 'Не печатает принтер',
        description: 'Принтер в отделе бухгалтерии не реагирует на задания печати',
        subscriber: 'accounting@company.com',
        status: 'IN_PROGRESS',
        assignedToId: operator2.id,
      },
      {
        title: 'Требуется новая мышь',
        description: 'Сломалась компьютерная мышь, нужна замена',
        subscriber: 'employee@company.com',
        status: 'CLOSED',
        assignedToId: operator1.id,
      },
    ],
  });

  const createdTickets = await prisma.ticket.findMany();

  await prisma.comment.createMany({
    data: [
      { content: 'Проверил кабель, проблема не в этом. Нужна диагностика роутера.', authorId: operator1.id, ticketId: createdTickets[0].id },
      { content: 'Перезагрузил принтер, проблема сохраняется.', authorId: operator2.id, ticketId: createdTickets[1].id },
      { content: 'Мышь заменена, тикет можно закрывать.', authorId: operator1.id, ticketId: createdTickets[2].id },
      { content: 'Роутер заменен, проблема решена.', authorId: admin.id, ticketId: createdTickets[0].id },
    ],
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch(e => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
