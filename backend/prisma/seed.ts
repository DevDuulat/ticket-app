import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  const supervisor = await prisma.user.upsert({
    where: { email: 'supervisor@demo.com' },
    update: {},
    create: {
      email: 'supervisor@demo.com',
      name: 'Supervisor User',
      password: password,
      role: 'SUPERVISOR',
    },
  });

  const operator = await prisma.user.upsert({
    where: { email: 'operator@demo.com' },
    update: {},
    create: {
      email: 'operator@demo.com',
      name: 'Operator User',
      password: password,
      role: 'OPERATOR',
    },
  });

  const ticket1 = await prisma.ticket.create({
    data: {
      title: 'Не работает интернет',
      description: 'Абонент жалуется на отсутствие соединения.',
      status: 'OPEN',
      assignedTo: { connect: { id: operator.id } },
      subscriber: 'Иван Иванов', // исправлено с subscriberName на subscriber
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      title: 'Проблема со скоростью',
      description: 'Интернет слишком медленный',
      status: 'IN_PROGRESS',
      assignedTo: { connect: { id: operator.id } },
      subscriber: 'Петр Петров', // исправлено с subscriberName на subscriber
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        content: 'Связался с клиентом, выясняем детали.',
        ticketId: ticket1.id,
        authorId: operator.id,
      },
      {
        content: 'Проблема подтверждена, передано в техподдержку.',
        ticketId: ticket1.id,
        authorId: supervisor.id,
      },
      {
        content: 'Настроил оборудование, проблема должна уйти.',
        ticketId: ticket2.id,
        authorId: operator.id,
      },
    ],
  });

  console.log('Seed completed with users, tickets, and comments');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
