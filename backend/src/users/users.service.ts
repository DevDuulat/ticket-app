import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
};

const users: User[] = [
  {
    userId: 1,
    username: 'alice@mail.ru',
    password: 'alice@mail.ru',
  },
  {
    userId: 2,
    username: 'Bob',
    password: 'Bob123',
  },
];
@Injectable()
export class UsersService {
  async findUserByName(username: string): Promise<User | undefined> {
    return users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }
}
