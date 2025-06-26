import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local-guards';
import { PassportJwtAuthGuard } from './guards/passport-jwt-guards';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @UseGuards(PassportJwtAuthGuard)
  @Get('me')
  getUserInfo(@Request() req) {
    return req.user;
  }
}
