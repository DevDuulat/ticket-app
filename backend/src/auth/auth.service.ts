import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';

type AuthInput = { username: string; password: string };
type SignInData = { userId: number; username: string };
type AuthResult = { accessToken: string; userId: number; username: string };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return this.signIn(user);
  }

  async validateUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const user = await this.usersService.findUserByName(username);

    if (user && (await compare(password, user.password))) {
      return {
        userId: user.id,
        username: user.email,
        role: user.role,
      };
    }

    return null;
  }

  async signIn(user: SignInData & { role: string }): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      userId: user.userId,
      username: user.username,
    };
  }
}
