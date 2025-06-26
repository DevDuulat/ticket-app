import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Получить всех пользователей
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findUserByName(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: username },
    });
  }

  // Найти всех операторов
  async findOperators() {
    return this.prisma.user.findMany({
      where: { role: Role.OPERATOR },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
