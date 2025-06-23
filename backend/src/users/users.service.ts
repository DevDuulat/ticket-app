import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
  role: string;
};

@Injectable()
export class UsersService {
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

  async findOperators(): Promise<Omit<User, 'password'>[]> {
    return this.users
      .filter((user) => user.role === 'OPERATOR')
      .map(({ password, ...user }) => user);
  }
}
