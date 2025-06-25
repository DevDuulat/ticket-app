import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { Role } from '@prisma/client';

export type User = {
  userId: number;
  username: string;
  password: string;
  role: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly users: User[] = [
    {
      userId: 1,
      username: 'alice@mail.ru',
      password: 'alice@mail.ru',
      role: 'SUPERVISOR',
    },
    {
      userId: 2,
      username: 'Bob',
      password: 'Bob123',
      role: 'OPERATOR',
    },
    {
      userId: 3,
      username: 'Bob1233',
      password: 'Bob123',
      role: 'OPERATOR',
    },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findUserByName(username: string): Promise<User | undefined> {
    return this.users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async findOperators() {
    const operators = await this.prisma.user.findMany({
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

    return operators;
  }
}
