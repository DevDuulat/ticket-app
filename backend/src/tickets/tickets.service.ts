import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TicketStatus } from '@prisma/client';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  createTicket(dto: { title: string; description: string; subscriber: string; userId: number }) {
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
    const ticket = await this.prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) throw new NotFoundException('Ticket not found');

    return this.prisma.comment.create({
      data: {
        content,
        ticketId,
        authorId,
      },
    });
  }

  async updateStatus(ticketId: number, status: TicketStatus) {
    return this.prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
    });
  }

  async reassignTicket(ticketId: number, newUserId: number, currentUserRole: string) {
    if (currentUserRole !== 'SUPERVISOR') {
      throw new ForbiddenException('Only supervisors can reassign tickets');
    }

    return this.prisma.ticket.update({
      where: { id: ticketId },
      data: { assignedToId: newUserId },
    });
  }
}
