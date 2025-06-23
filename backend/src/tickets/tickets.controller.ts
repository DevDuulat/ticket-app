import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  Patch,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { TicketsService, Ticket } from './tickets.service';
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
  reassignTicket(
    @Param('id', ParseIntPipe) id: number,
    @Body('newUserId', ParseIntPipe) newUserId: number,
    @Req() req: any,
  ) {
    const userRole = req.user.role;
    return this.ticketsService.reassignTicket(id, newUserId, userRole);
  }

  @Get(':id')
  getTicket(@Param('id') id: string): Promise<Ticket> {
    return this.ticketsService.getTicketById(+id);
  }
}
