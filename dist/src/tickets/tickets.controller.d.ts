import { TicketsService } from './tickets.service';
import { TicketStatus } from '@prisma/client';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(body: any, req: any): import(".prisma/client").Prisma.Prisma__TicketClient<any, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<any[]>;
    addComment(id: string, body: any, req: any): unknown;
    updateStatus(id: string, status: TicketStatus): unknown;
    reassign(id: string, userId: number, req: any): unknown;
}
