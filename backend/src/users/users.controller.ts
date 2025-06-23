import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guards';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('operators')
  @UseGuards(AuthGuard)
  async findOperators() {
    return this.usersService.findOperators();
  }
}
