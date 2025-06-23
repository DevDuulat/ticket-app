import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TicketStatus } from '@prisma/client';

export interface Ticket {
  id: number;
  subscriber: string;
  description: string;
  status: TicketStatus;
}

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  createTicket(dto: {
    title: string;
    description: string;
    subscriber: string;
    userId: number;
  }) {
    return this.prisma.ticket.create({
      data: {
        title: dto.title,
        description: dto.description,
        subscriber: dto.subscriber,
        assignedToId: dto.userId,
      },
    });
  }

  getTickets() {
    return this.prisma.ticket.findMany({
      include: {
        assignedTo: true,
        comments: true,
      },
    });
  }

  async addComment(ticketId: number, content: string, authorId: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
    });
    if (!ticket) throw new NotFoundException('Ticket not found');

    return this.prisma.comment.create({
      data: {
        content,
        ticketId,
        authorId,
      },
    });
  }

  async getTicketById(id: number): Promise<Ticket> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        assignedTo: true,
        comments: {
          include: { author: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    if (!ticket) throw new NotFoundException(`Тикет с id ${id} не найден`);
    return ticket;
  }

  async updateStatus(id: number, status: TicketStatus) {
    const ticket = await this.prisma.ticket.update({
      where: { id },
      data: { status },
    });
    return ticket;
  }

  async reassignTicket(
    ticketId: number,
    newUserId: number,
    currentUserRole: string,
  ) {
    if (currentUserRole !== 'SUPERVISOR') {
      throw new ForbiddenException('Only supervisors can reassign tickets');
    }

    return this.prisma.ticket.update({
      where: { id: ticketId },
      data: { assignedToId: newUserId },
      include: { assignedTo: true },
    });
  }
}
