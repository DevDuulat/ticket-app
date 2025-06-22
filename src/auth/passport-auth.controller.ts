import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  NotImplementedException,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guards';
import { PassportLocalGuard } from './guards/passport-local-guards';
import { PassportJwtAuthGuard } from './guards/passport-jwt-guards';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Request() request) {
    return this.authService.signIn(request.user);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @UseGuards(PassportJwtAuthGuard)
  getUserInfo(@Request() request) {
    return request.user;
  }
}
