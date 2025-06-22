"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TicketsService = class TicketsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    createTicket(dto) {
        return this.prisma.ticket.create({
            data: {
                title: dto.title,
                description: dto.description,
                subscriber: dto.subscriber,
                assignedToId: dto.userId,
            },
        });
    }
    getTickets() {
        return this.prisma.ticket.findMany({
            include: {
                assignedTo: true,
                comments: true,
            },
        });
    }
    async addComment(ticketId, content, authorId) {
        const ticket = await this.prisma.ticket.findUnique({ where: { id: ticketId } });
        if (!ticket)
            throw new common_1.NotFoundException('Ticket not found');
        return this.prisma.comment.create({
            data: {
                content,
                ticketId,
                authorId,
            },
        });
    }
    async updateStatus(ticketId, status) {
        return this.prisma.ticket.update({
            where: { id: ticketId },
            data: { status },
        });
    }
    async reassignTicket(ticketId, newUserId, currentUserRole) {
        if (currentUserRole !== 'SUPERVISOR') {
            throw new common_1.ForbiddenException('Only supervisors can reassign tickets');
        }
        return this.prisma.ticket.update({
            where: { id: ticketId },
            data: { assignedToId: newUserId },
        });
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map