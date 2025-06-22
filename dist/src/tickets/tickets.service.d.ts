import { PrismaService } from '../prisma/prisma.service';
import { TicketStatus } from '@prisma/client';
export declare class TicketsService {
    private prisma;
    constructor(prisma: PrismaService);
    createTicket(dto: {
        title: string;
        description: string;
        subscriber: string;
        userId: number;
    }): import(".prisma/client").Prisma.Prisma__TicketClient<any, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getTickets(): import(".prisma/client").Prisma.PrismaPromise<any[]>;
    addComment(ticketId: number, content: string, authorId: number): unknown;
    updateStatus(ticketId: number, status: TicketStatus): unknown;
    reassignTicket(ticketId: number, newUserId: number, currentUserRole: string): unknown;
}
