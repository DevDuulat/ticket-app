import { IsInt } from 'class-validator';

export class ReassignTicketDto {
  @IsInt()
  operatorId: number;
}
