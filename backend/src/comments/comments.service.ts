// src/comments/comments.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(dto: CreateCommentDto, userId: number) {
    return this.prisma.comment.create({
      data: {
        content: dto.content,
        ticketId: dto.ticketId,
        authorId: userId,
      },
    });
  }

  async getCommentsByTicket(ticketId: number) {
    return this.prisma.comment.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'asc' },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }
}
