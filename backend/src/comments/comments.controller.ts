// src/comments/comments.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '../auth/guards/auth.guards';
import { Request } from 'express';

@Controller('comments')
@UseGuards(AuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateCommentDto, @Req() req: any) {
    return this.commentsService.createComment(dto, req.user.userId);
  }

  @Get('ticket/:ticketId')
  async getByTicket(@Param('ticketId') ticketId: string) {
    return this.commentsService.getCommentsByTicket(Number(ticketId));
  }
}
