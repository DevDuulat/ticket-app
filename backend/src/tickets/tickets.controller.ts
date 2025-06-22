import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { PassportJwtAuthGuard } from 'src/auth/guards/passport-jwt-guards';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { TicketStatus } from '@prisma/client';

@UseGuards(PassportJwtAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() body, @Request() req) {
    return this.ticketsService.createTicket({
      ...body,
      userId: req.user.sub,
    });
  }

  @Get()
  findAll() {
    return this.ticketsService.getTickets();
  }

  @Post(':id/comments')
  addComment(@Param('id') id: string, @Body() body, @Request() req) {
    return this.ticketsService.addComment(+id, body.content, req.user.sub);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: TicketStatus) {
    return this.ticketsService.updateStatus(+id, status);
  }

  @Patch(':id/reassign')
  @UseGuards(RolesGuard)
  @Roles('SUPERVISOR')
  reassign(
    @Param('id') id: string,
    @Body('userId') userId: number,
    @Request() req,
  ) {
    return this.ticketsService.reassignTicket(+id, userId, req.user.role);
  }
}
